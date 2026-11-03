import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Envolve qualquer secção e faz um fade-up suave.
// Com `active`: anima quando o convite abre (Hero).
// Sem `active`: anima quando entra no ecrã ao rolar (resto do site).
export default function Reveal({ children, delay = 0, y = 28, className = '', active }) {
  if (active !== undefined) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ duration: 1.1, delay: active ? delay : 0, ease }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.02, margin: '0px 0px -120px 0px' }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
