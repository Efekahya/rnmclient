import React from "react"
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg"

const href = window.location.href.split("/").slice(3)
const hrefUpper: string[] = []

for (let i = 0; i < href.length; i++) {
  hrefUpper.push(href[i].charAt(0).toUpperCase() + href[i].slice(1))
}

let temp: string

export default function Navigation() {
  return (
    <div className="navigation--navigationContainer">
      {href.map((item, index) => {
        for (let i = 0; i < href.length; i++) {
          if (href[i] === item) {
            if (i === 0) {
              temp = href[0]
            } else {
              temp = href.slice(0, i + 1).join("/")
            }
          }
        }
        return (
          <>
            <div key={index} className="navigation--navigationText">
              <a href={"/" + temp}>{hrefUpper[index]}</a>
            </div>
            <RightArrow />
          </>
        )
      })}
    </div>
  )
}