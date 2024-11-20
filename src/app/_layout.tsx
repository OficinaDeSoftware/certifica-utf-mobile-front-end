import '../styles/global.css'
import { Slot } from 'expo-router'
import { SessionProvider } from '@/src/hooks/auth';

export default function Root() {
  return (
    <SessionProvider>
      <Slot/>
    </SessionProvider>
  )
}