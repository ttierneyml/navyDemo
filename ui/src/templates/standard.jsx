import Header from "../components/header"
import Footer from "../components/footer"

export default function StandardPageTemplate(props) {
    return (
      <>
        <Header />
        <div style={{ padding: '50px' }}>
          {props.children}
        </div>
        <Footer />
      </>
    )
}
  