// import IndexLayout from '../layouts';
// import Wrapper from '../components/Wrapper';
// import SiteNav from '../components/header/SiteNav';
// import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
// import * as React from 'react';
// import { css } from '@emotion/core';

// import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
// import { PostFullContent } from '../components/PostContent';
// import Footer from '../components/Footer';
// import Helmet from 'react-helmet';

// const PageTemplate = css`
//   .site-main {
//     background: #fff;
//     padding-bottom: 4vw;
//   }
// `;

// const About: React.FC = () => (
//   <IndexLayout>
//     <Helmet>
//       <title>About</title>
//     </Helmet>
//     <Wrapper css={PageTemplate}>
//       <header css={[outer, SiteHeader]}>
//         <div css={inner}>
//           <SiteNav />
//         </div>
//       </header>
//       <main id="site-main" className="site-main" css={[SiteMain, outer]}>
//         <article className="post page" css={[PostFull, NoImage]}>
//           <PostFullHeader>
//             <PostFullTitle>About</PostFullTitle>
//           </PostFullHeader>

//           <PostFullContent className="post-full-content">
//             <div className="post-content">
//               {/* <img itemprop="image" class="img-rounded" src="https://i.imgur.com/BUZF6kml.jpg" alt="devhoot" /> */}
//               <h4>
//                 A programming blog by Imran Khan.
//               </h4>
//               <p>
//               </p>
//             </div>
//           </PostFullContent>
//         </article>
//       </main>
//       <Footer />
//     </Wrapper>
//   </IndexLayout >
// );

// export default About;