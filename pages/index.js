import Head from "next/head"
import { useEffect, useState } from "react"
//  import Link from 'next/link'

import styles from "styles/Home.module.css"
import { colors } from "styles/theme"

import AppLayout from "components/AppLayout/AppLayout"
import Avatar from "components/Avatar"
import Button from "components/Button/button"
import GitHub from "components/Icons/Github"
import { Logo } from "Components/Icons/Logo"

import { checkAuthUser, loginWithGitHub } from "../firebase/client"

export default function Home() {
  const [user, setUser] = useState(undefined)
  console.log(`I AM IN THE user${user}`)
  useEffect(() => {
    console.log("I AM THE USE EFFECT BEFORE CHEACKAUTH METHOD")
    checkAuthUser(setUser)
    console.log("I AM THE USE EFFECT AFTER CHEACKAUTH METHOD")
  }, [])
  const handleClick = () => {
    loginWithGitHub().then((user) => {
      const { avatar, username, email } = user
      setUser(avatar, username, email)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        {console.log("I AM IN THE HEADER")}
        <title>👨🏻‍🚀🆉🅸🅷🅾!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        {console.log("I AM IN THE AppLayout")}
        <section>
          <Logo width="150" />
          <h1>Welcome to Ziho!</h1>
          <h2>Zihoniens are the citizens from Ziho!</h2>
          <div>
            {/* In the code below you can see that if the user is null,
        The button of Github Login is displayed.
        If the user is not null and not undefined the userWelcomeDiv
        is displayed.
        Otherwise/whatsgon bruh! */}
            {user === null ? (
              <Button onClick={handleClick}>
                {console.log("I AM IN THE Button")}
                <GitHub fill="#fff" width={24} height={24} />
                Login with Github
              </Button>
            ) : user && user.avatar ? (
              <div className="userWelcomeDiv" style={styles.container}>
                {console.log(`I AM IN THE userWelcomeDiv ${user.email}`)}
                <Avatar alt={user.username} src={user.avatar} text={user.email} withText={true} />
              </div>
            ) : (
              <div className="loader">
                <div className="loader-wheel"></div>
                <div className="loader-text"></div>
              </div>
            )}
          </div>
        </section>
      </AppLayout>
      <style jsx>
        {`
          div > img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
          }
          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }
          h1 {
            color: ${colors.primary};
            font-size: 24px;
          }
          div {
            margin-top: 16px;
          }
        `}
      </style>
    </div>
  )
}