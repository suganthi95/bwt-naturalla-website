'use client';
// import React from "react";
// import { MotionConfig, motion } from "framer-motion";

interface Props {
  open: boolean;
  handleclick: () => void;
}

import * as React from 'react';
import { motion } from 'framer-motion';

const Path: React.FC<React.ComponentProps<typeof motion.path>> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

interface Props {
  open: boolean;
  handleclick: () => void;
}

export const MenuToggle: React.FC<Props> = ({ open, handleclick }) => (
  <button
    onClick={handleclick}
    className="block xl:hidden p-2 focus:outline-none"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
        animate={open ? 'open' : 'closed'}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        animate={open ? 'open' : 'closed'}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
        animate={open ? 'open' : 'closed'}
      />
    </svg>
  </button>
);

export default MenuToggle;
