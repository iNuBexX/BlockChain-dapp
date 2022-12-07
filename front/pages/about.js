import Meta from '../components/Meta'


const about = () => {
  return (
  <div>
    <style jsx>{`
        p {
          color: blue;
          text-align:center;
        }
        div {
          background: #eaeaea;
          text-align:center;
          padding:30px;
          
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <Meta title='About us' />
      <h1>About us</h1>
      <h4><p>
    the tunisian central bank created this application to certify clients within the new kyc programme </p><p>
    for a robust Decentralized/hybrid recogition system which allows us to avoid money laundring </p>
   
    <p>
    also we can monitor closely financial operations to garantee fairness of  market for all the tunisian banks / banking agencies 
</p>
<p>the following picture is a summery of the inner workings mechanisms of our system</p>  
</h4>
<img
      src='/img.png'
      alt="Picture of the author"
      width="1080px"
      height="720px"
    />
    </div>
  )
}

export default about
