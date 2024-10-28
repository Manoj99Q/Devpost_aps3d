import React from "react";
import { motion } from "framer-motion";

const Avatar = ({ characterInfo }) => {
  if (!characterInfo) return null;

  return (
    <motion.div
      className="relative w-64 h-64 mb-4"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <img
        src={characterInfo.avatar}
        alt={characterInfo.name}
        className="w-full h-full object-cover rounded-full border-4 border-yellow-400 shadow-lg"
      />
    </motion.div>
  );
};

export default Avatar;
