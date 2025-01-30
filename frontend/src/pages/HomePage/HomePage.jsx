//export default function HomePage() {
  //return <h1>Home Page</h1>;
//}
import { Link } from 'react-router-dom';
import './HomePage.css';
export default function HomePage() {
 return (
   <div className="home-page">
     <header>
       <h1>Welcome to FamilyTree</h1>
       <p>Preserve Your Family History for Generations to Come</p>
     </header>

     <section className="about">
       <h2>About Our Platform</h2>
       <p>Build your family tree, share stories, and connect with relatives. Our easy-to-use tools help you document and explore your family heritage.</p>
     </section>

     <section className="features">
       <h2>Key Features</h2>
       <div className="feature-list">
         <div>
           <h3>Create Family Trees</h3>
           <p>Build detailed family trees with our intuitive interface</p>
         </div>
         <div>
           <h3>Share Memories</h3>
           <p>Add photos and stories to preserve family history</p>
         </div>
         <div>
           <h3>Collaborate</h3>
           <p>Invite family members to contribute and explore together</p>
         </div>
       </div>
     </section>

     <section className="cta">
       <h2>Start Your Family Tree Today</h2>
       <div className="cta-buttons">
         <Link to="/signup">Get Started</Link>
         &nbsp; | &nbsp;
         <Link to="/login">Login</Link>
       </div>
     </section>
   </div>
 );
}