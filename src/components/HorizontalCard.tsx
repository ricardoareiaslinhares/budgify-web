'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

interface HorizontalCardProps {
  name: string;
  text: string;
  open: boolean;
  onClose: () => void;
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({
  name,
  text,
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <Box position="relative" display="inline-block" m={2}>
{/*       <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          zIndex: 1,
          backgroundColor: 'white',
          boxShadow: 1,
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton> */}

      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
          boxShadow: 3,
          padding: 2,
          minWidth: {sx:"100px", sm:"200px", md:"400px"},
        }}
      >
        <Avatar sx={{ width: 56, height: 56, mr: 2 }}>{name.charAt(0)}</Avatar>

        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
          <Typography variant="h6">{name}</Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            mt={1}
            gap={1}
          >
            <NewReleasesIcon color="info" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              New user - {text}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

