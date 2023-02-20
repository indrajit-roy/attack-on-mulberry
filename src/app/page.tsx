"use client"
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { log } from 'console'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  window.onAndroidEvent = (event) => {
    console.log(`This is Android Event on web: ${event}`)
  }
  const [didAskForOTP, setDidAskOtp] = useState(false)
  function myOtpCode() {
    console.log("DOM loaded");
    const input = document.getElementById("single-factor-code-text-field") as HTMLInputElement
    console.log(`input -> ${input}`);
    if (!input) return;
    console.log("AbortController initialized");
    const ac = new AbortController();
    console.log("OTP called");
    if(didAskForOTP) return;
    navigator.credentials.get({
      otp: { transport: ['sms'] },
      signal: ac.signal
    }).then(otp => {
      console.log(`Otp is : ${otp}`);
      input.value = otp?.code;
      setDidAskOtp(false)
    }).catch(err => {
      console.log(`OTP error: ${err}`);
      setDidAskOtp(false)
    });
    setDidAskOtp(true)
  }

  function triggerOtp() {
    
    window.AndroidBridge.testAndroidBridge("Hi from web")
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
        <input id="single-factor-code-text-field" autoComplete="one-time-code" />
        <button id="single-factor-code-button" onClick={triggerOtp}>Trigger OTP</button>
      </div>
    </main>
  )
}


