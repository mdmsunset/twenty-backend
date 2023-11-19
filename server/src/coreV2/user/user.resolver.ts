import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import crypto from 'crypto';

import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Workspace } from '@prisma/client';

import { SupportDriver } from 'src/integrations/environment/interfaces/support.interface';
import { FileFolder } from 'src/core/file/interfaces/file-folder.interface';

import { AbilityGuard } from 'src/guards/ability.guard';
import { CheckAbilities } from 'src/decorators/check-abilities.decorator';
import { DeleteUserAbilityHandler } from 'src/ability/handlers/user.ability-handler';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { EnvironmentService } from 'src/integrations/environment/environment.service';
import { streamToBuffer } from 'src/utils/stream-to-buffer';
import { FileUploadService } from 'src/core/file/services/file-upload.service';
import { AuthWorkspace } from 'src/decorators/auth-workspace.decorator';
import { assert } from 'src/utils/assert';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { UserV2 } from 'src/coreV2/user/user.entity';

import { UserService } from './services/user.service';

const getHMACKey = (email?: string, key?: string | null) => {
  if (!email || !key) return null;

  const hmac = crypto.createHmac('sha256', key);
  return hmac.update(email).digest('hex');
};

@UseGuards(JwtAuthGuard)
@Resolver(() => UserV2)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly environmentService: EnvironmentService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Query(() => UserV2)
  async currentUserV2(@AuthUser() { id }: UserV2) {
    const user = await this.userService.findById(id);
    assert(user, 'User not found');
    return user;
  }

  @ResolveField(() => String, {
    nullable: false,
  })
  displayName(@Parent() parent: UserV2): string {
    return `${parent.firstName ?? ''} ${parent.lastName ?? ''}`;
  }

  @ResolveField(() => String, {
    nullable: true,
  })
  supportUserHash(@Parent() parent: UserV2): string | null {
    if (this.environmentService.getSupportDriver() !== SupportDriver.Front) {
      return null;
    }
    const key = this.environmentService.getSupportFrontHMACKey();
    return getHMACKey(parent.email, key);
  }

  @Mutation(() => String)
  async uploadProfilePictureV2(
    @AuthUser() { id }: UserV2,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: FileUpload,
  ): Promise<string> {
    const stream = createReadStream();
    const buffer = await streamToBuffer(stream);
    const fileFolder = FileFolder.ProfilePicture;

    const { paths } = await this.fileUploadService.uploadImage({
      file: buffer,
      filename,
      mimeType: mimetype,
      fileFolder,
    });

    await this.userService.updateOne(id, {
      avatarUrl: paths[0],
    });

    return paths[0];
  }

  @Mutation(() => UserV2)
  @UseGuards(AbilityGuard)
  @CheckAbilities(DeleteUserAbilityHandler)
  async deleteUserV2(
    @AuthUser() { id: userId }: UserV2,
    @AuthWorkspace() { id: workspaceId }: Workspace,
  ) {
    return this.userService.deleteUser({ userId, workspaceId });
  }
}
