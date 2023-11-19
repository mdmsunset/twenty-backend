import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { isNonEmptyString } from '@sniptt/guards';

import { IconComponent } from '@/ui/display/icon/types/IconComponent';
import { Avatar, AvatarType } from '@/users/components/Avatar';

import { Chip, ChipVariant } from './Chip';

export type EntityChipProps = {
  linkToEntity?: string;
  entityId: string;
  name: string;
  pictureUrl?: string;
  avatarType?: AvatarType;
  variant?: EntityChipVariant;
  LeftIcon?: IconComponent;
};

export enum EntityChipVariant {
  Regular = 'regular',
  Transparent = 'transparent',
}

export const EntityChip = ({
  linkToEntity,
  entityId,
  name,
  pictureUrl,
  avatarType = 'rounded',
  variant = EntityChipVariant.Regular,
  LeftIcon,
}: EntityChipProps) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const handleLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (linkToEntity) {
      event.preventDefault();
      event.stopPropagation();
      navigate(linkToEntity);
    }
  };

  return isNonEmptyString(name) ? (
    <Chip
      label={name}
      variant={
        linkToEntity
          ? variant === EntityChipVariant.Regular
            ? ChipVariant.Highlighted
            : ChipVariant.Regular
          : ChipVariant.Transparent
      }
      leftComponent={
        LeftIcon ? (
          <LeftIcon size={theme.icon.size.md} stroke={theme.icon.stroke.sm} />
        ) : (
          <Avatar
            avatarUrl={pictureUrl}
            colorId={entityId}
            placeholder={name}
            size="sm"
            type={avatarType}
          />
        )
      }
      clickable={!!linkToEntity}
      onClick={handleLinkClick}
    />
  ) : (
    <></>
  );
};
