import React from 'react'
import { Link } from 'react-router-dom'
import './IntroPage.css'

function IntroPage () {
  return (
    <React.Fragment>
      <h1 className='introHeader'> What Is Monkey Business? </h1>
      <div className='introParagraph'>
        Monkey Business is an educational investing tool meant to help less experienced investors test out their marketing strategies without any
        financial risk. In an environment full of unpredictability and misleading information, the stock market can be overwhelming and very risky 
        to any potential newcomers. Through an investing tool like this, people will be able to practice their stock market skills in a low-stress 
        environment and get the experience necessary to handle the real deal.
      </div>

      <h1 className='introHeader'>The Monkey Algorithm</h1>
      <table>
        <tr>
          <td>The standout feature of Monkey Business is our state-of-the-art "Monkey Algorithm." By observing live feeds of gorilla enclosures, we have
          developed an algorithm that can tap into the wisdom of our fellow primates to help guide our investing decisions. By using this algorithm, 
          the monkeys can choose from your own curated list of stocks and impart their wisdom onto you to help make your investing decisions.</td>
        
          <td><img src = "https://cdn.discordapp.com/attachments/1023386213748580353/1156693419972886558/hard_image.png?ex=658c8d31&is=657a1831&hm=4837c385ab832b0467d11c01fdedf55bf83dcd7f36532b2c2fe86543818ef3e1&" 
          alt='Monkey Habitat Screenshot'/></td>
        </tr>
      </table>

      <h1 className='introHeader'> Meet The Developers </h1>
      <table>
        <tr>
          <td><img src = "https://i.imgur.com/QOSpKbY.jpeg" alt='6 Chimpanzees'/></td>
          
          <td>Monkey Business is made by a team of college students who believe in the importance of our primal instincts. Our team is dedicated to 
          providing accessible investing options while also showing the power of our neighbors of the animal kingdom. Hopefully, with the tools at your 
          disposal and the wisdom of the monkeys, you will be able to succeed in the ever-changing stock market.</td>
        </tr>
        <tr>
          <td class = 'imgLink'><Link target = {"_blank"} to = 'https://imgur.com/QOSpKbY' >Image Source</Link></td>
        </tr>
      </table>
    </React.Fragment>
  )
}

export default IntroPage
