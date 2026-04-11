import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function BelongSection({ mountainImg }) {
  const [ref, visible] = useScrollReveal();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return null;









































}