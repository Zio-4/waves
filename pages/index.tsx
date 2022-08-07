import Head from 'next/head'
import Image from 'next/image'
import GradientLayout from '../Components/gradientLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <GradientLayout color='red' roundImage>
      <div>Home</div>
    </GradientLayout>
  )
}
