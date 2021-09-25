import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { useEffect } from "react"
gsap.registerPlugin(ScrollTrigger)

// AccountConatiner, QuestionContainer
export const AccountContainerGsap = ({ container }) => {
  useEffect(() => {
    gsap.from(`.${container}`, {
      duration: 1,
      y: "60",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}

export const HeaderContainerGsap = () => {
  useEffect(() => {
    gsap.from(".headerContainer", {
      duration: 2,
      y: "-100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}

export const HomeContainerGsap = () => {
  useEffect(() => {
    gsap.from(".homeContainer", {
      duration: 2,
      delay: 0.5,
      y: "100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}

export const BasicContainerGsap = () => {
  useEffect(() => {
    gsap.from(".basicContainer", {
      duration: 2,
      delay: 0.5,
      y: "100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}

export const HomeContentsLayoutGsap = ({ layout }) => {
  useEffect(() => {
    gsap.from(`.${layout}`, {
      duration: 1.5,
      y: "80",
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: `.${layout}`,
        start: "top 95%",
      }
    })
  }, [])
  return null
}

export const BottomContainerGsap = () => {
  useEffect(() => {
    gsap.from(".bottomContainer", {
      duration: 1,
      delay: 0,
      y: "100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}

export const QuizFeedBottomContainerGsap = () => {
  useEffect(() => {
    gsap.from(".feedContainer", {
      duration: 1.5,
      delay: 0,
      y: "100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}

export const LibraryFeedBottomContainerGsap = () => {
  useEffect(() => {
    gsap.from(".libraryContainer", {
      duration: 1.5,
      delay: 0,
      y: "100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}

export const FeedListContainerGsap = ({ layout }) => {
  useEffect(() => {
    gsap.from(`.${layout}`, {
      duration: 1.5,
      delay: 0,
      y: "100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return null
}