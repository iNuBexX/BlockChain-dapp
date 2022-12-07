import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Decentralized</span> KYC
      </h1>
      <p className={headerStyles.description}>
        We get to know you, we get to cherish you !
      </p>
    </div>
  )
}

export default Header
