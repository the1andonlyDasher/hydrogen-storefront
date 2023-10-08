import { Link, useLoaderData } from '@remix-run/react';
import { LoaderArgs } from '@shopify/remix-oxygen';
import { useIsPresent } from "framer-motion"
import { useEffect, useRef, useState } from 'react';
import { model } from '@components/atoms';
import { useAtom } from 'jotai';
import products from "../../public/images/kopf.jpg"
import simon from "../../public/images/simon.jpg"
import stephan from "../../public/images/stephan.jpg"
import DoubleSec from '@components/DoubleSection';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Footer from '@components/Footer';
import Tiles from '@components/hero/Tiles';
import { icons } from '@components/hero/icons';
import { simonBilder, stephanBilder } from '@components/images/images';



export function meta() {
  return [
    { title: 'Hydrogen' },
    { description: 'A custom storefront powered by Hydrogen' },
  ];
}

export async function loader({ context }: LoaderArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const ref = useRef<any>(!null);
  const { collections }: any = useLoaderData() || {}
  const [stableData, setData] = useState(collections);
  const [m, setM] = useAtom(model)
  const isPresent = useIsPresent();
  const video = useRef<any>(!null)

  useEffect(() => {
    video.current.play();
    collections && setData(collections)
  }, [collections])

  function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
    throw new Error('Function not implemented.');
  }

  return (<>
    <DoubleSec props={{
      left: true,
      sectionClass: "relative border-[#222] border-l ",
      children: (<>
        <div className='flex flex-col relative h-full w-full m-auto justify-center align-center md:max-h-[375px] '>
          <div className='mb-auto mx-4 img__wrapper py-2'>
            <h4>Denk immer daran</h4>
            <h1>Es ist alles nur Kopfsache</h1>
          </div>
          <div className="flex justify-center align-center flex-col h-full sec-pad_right gap-5 mx-4">
            <video ref={video} autoPlay loop muted className='max-h-[600px] max-w-[300px] sm:max-w-none'>
              <source src="/images/vid.mp4" type='video/mp4'></source>
            </video>
            {/* <img className="self-end my-0 mx-auto z-[2] w-[90%]" src={img} alt="Stephan und Simon" style={{ transformOrigin: "bottom right", maxWidth: "500px" }} /> */}
          </div>
          <div className='mb-auto mx-4 img__wrapper'>
            <p className='my-5'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
            <Link to="https://www.studiobookr.com/kopfsache-by-stephan-mueller-56870#/"><button className="btn__primary" type="button">Termin buchen</button></Link>
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex hero-grid_right justify-center align-center flex-col sec-pad_left">
          <div className='flex gap-5 flex-col px-10 py-5 justify-center align-center'>
            <div className=''>
              <h4>Denk immer daran</h4>
              <h1>Es ist alles nur Kopfsache</h1>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
              <Link to="https://www.studiobookr.com/kopfsache-by-stephan-mueller-56870#/"><button className="btn__primary" type="button">Termin buchen</button></Link>

            </div>
          </div>
        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: true,
      sectionClass: "relative ",
      children: (<>
        <div className='hidden grid-cols-1  relative  relative h-full w-full m-auto max-h-[70%] justify-center align-center z-10 md:grid'>
          <div className='flex justify-center align-center flex-col p-5'>
            <Tiles gridClass="feature-grid" array={icons}/>
          </div>
        </div>
        <div className='hidden justify-start align-center absolute top-0 left-[50%] w-full h-full z-[1] overflow-hidden md:flex'>
          <div className='bg-grid_section2 flex flex-wrap w-full my-auto grid-cols-5 grid-rows-[repeat(2,_minmax(2rem,_1fr))] justify-start align-start'>
            <h2 className='text-left'>Schneiden</h2>
            <h2 className='text-left'>Waschen</h2>
            <h2 className='text-left'>Fohnen</h2>
            <h2 className='text-left'>Färben</h2>
            <h2 className='text-left'>Stylen</h2>
            <h2 className='text-left'>Föhnen</h2>
            <h2 className='text-left'>Waxen</h2>
            <h2 className='text-left'>Massieren</h2>
            <h2 className='text-left'>Tönen</h2>
          </div>
        </div>

      </>),
      deskChildren: (<>
        <div className="flex justify-center h-full align-center flex-col bg-[#0f0f0f00] p-0 realative md:bg-[#0f0f0f] md:sec-pad_left md:sec-pad_right">
          <div className='flex gap-5 flex-col'>
            <div className='my-4 md:px-8'>
              <h5 className='text-[var(--clr-contrast-400)]'>Unsere Philosophie:</h5>
              <h3 className='my-2'>Bei uns sind Alle herzlich willkommen...</h3>
              <p>... wir freuen uns über deinen Besuch!</p>
            </div>
            <Tiles addClass="img__wrapper" gridClass="feature-grid" array={icons}/>
            <div className='my-4 md:px-8'>
              <h4 className='my-2'>Ein umfangreiches Angebot...</h4>
              <p>...erwartet dich bei uns! Was auch immer Dir vorschwebt, zusammen werden wir deine Vorstellung Realität werden lassen.</p>
              <button className='btn__outline' role='button' type="button">Call to Action</button>
            </div>
          </div>
          <div className='img__wrapper flex justify-center align-center absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden'>
            <div className='bg-grid_section2 flex flex-wrap w-full my-auto grid-cols-5 grid-rows-[repeat(2,_minmax(2rem,_1fr))] justify-center align-center'>
              <h2>Schneiden</h2>
              <h2>Waschen</h2>
              <h2>Fohnen</h2>
              <h2>Färben</h2>
              <h2>Stylen</h2>
              <h2>Föhnen</h2>
              <h2>Waxen</h2>
              <h2>Massieren</h2>
              <h2>Tönen</h2>
            </div>
          </div>

        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: false,
      sectionClass: "relative",
      ref: ref,
      children: (<>
        <div className='grid grid-cols-1  relative h-full w-full m-auto  justify-center align-center py-20'>
          <div className="flex justify-center align-center flex-col h-full">
            <div className='hidden h-full justify-center align-center flex-col pr-10 md:flex  border-b border-[#222]'>
              <div className=''>
                <h2 className='my-2'>Hi, ich bin Stephan</h2>
                <p className='my-2'>Friseurmeister seit 200#. Ich freue mich darauf Dir zu Deinem neuen Look zu verhelfen.</p>
              </div>
              <div className='my-4'>
                <h4 className='my-2'>Erfahre mehr über mich <a className='underline' aria-label='link'>hier!</a></h4>
              </div>
            </div>
            <div className='flex  justify-center align-center flex-col pr-10 img__wrapper'>
              <div className=''>
                <h2 className='my-2'>Hi, wir sind Stephan und Simon</h2>
                <p className='my-2'>Gemeinsam werden wir dich verwandeln und freuen uns darauf Dir zu Deinem neuen Look zu verhelfen.</p>
              </div>
            </div>
            <div className='flex flex-no
                wrap flex-row w-full gap-5 my-12 img__wrapper'>
              <div className='flex flex-nowrap w-auto flex-[1_1_50%] h-full justify-start img__wrapper'>
            {/* <Tiles gridClass="about-grid about-grid-left" array={stephanBilder} perspective={false}/> */}
                <div className='rounded-br-lg w-full min-h-[200px]  h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${stephan})` }}></div>
              </div>
              <div className='flex flex-nowrap w-auto flex-[1_1_50%] h-full justify-start img__wrapper'>
            {/* <Tiles gridClass="about-grid about-grid-right" array={simonBilder} perspective={false}/> */}
                <div className='rounded-br-lg w-full min-h-[200px] h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${simon})` }}></div>
              </div>
            </div>
            <div className='hidden flex-nowrap w-full h-full justify-start md:flex'>
            <Tiles gridClass="about-grid about-grid-right" array={simonBilder} perspective={false}/>          
              {/* <div className='rounded-tl-lg max-w-[100%] min-h-[200px] h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${simon})` }}></div> */}
            </div>
            <div className='img__wrapper'>
              <h4>Erfahre mehr über uns <a className='underline' aria-label='link'>hier!</a></h4>
              <p>Bleibe gerne mit uns in Verbindung:</p>
              <div className='socials flex justify-even my-5 w-full py-5'>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faFacebookF} /></Link>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faInstagram} /></Link>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faEnvelope} /></Link>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faMessage} /></Link>
              </div>
            </div>
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex justify-center align-center flex-col border-l border-[#222] py-20">
          <div className='flex-auto flex'></div>
          <div className='flex relative h-full justify-center align-center flex-col'>

            <div className='flex-nowrap w-full h-full justify-start space-x-10 md:space-x-15 border-b border-[#222]'>
              <Tiles gridClass="about-grid about-grid-left" array={stephanBilder} perspective={false}/>
              {/* <div className='rounded-br-lg max-w-[100%] h-[100%] flex-[1_1_100%] bg-cover bg-top' style={{ backgroundImage: `url(${stephan})` }}></div> */}
            </div>
          </div>
          <div className='hidden h-full justify-center align-center flex-col px-10 md:flex'>
            <div className=''>
              <h2 className='my-2'>Hi, ich bin Simon!</h2>
              <p className='my-2'>Ich arbeite mit Stephan zusammen seit 20??.Gemeinsam werden wir dich verwandeln.</p>
              <h4 className='my-2'>Erfahre mehr über mich <a className='underline' aria-label='link'>hier!</a></h4>
            </div>
          </div>
        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: false,
      sectionClass: "relative",
      header: "Hol dir deine Haarpflege direkt bei uns!",
      // background:(<>
      //     <div className='absolute top-0 left-0 w-full h-full bg-center' style={{backgroundImage:`url('${products}')`}}></div>
      // </>),
      children: (<>
        <div className='grid grid-cols-1  relative h-full w-full m-auto justify-center align-center md:max-h-[50%]'>
          <div className="flex justify-center align-center flex-col h-full gap-5">
            <div className='flex flex-col h-full  my-auto bg-center bg-cover min-h-[400px]' style={{ backgroundImage: `url('${products}')` }}></div>
            <div className='mb-auto img__wrapper '>
              <h2>Finde tolle Produkte</h2>
              <p>...die zu dir passen.</p>
            </div>
            {/* <img className="my-0 z-[2] w-full" src={products} alt="Stephan und Simon" style={{ scale: "1", transformOrigin: "bottom right", maxWidth:"500px" }} /> */}
            <div className='mt-auto img__wrapper '>
              {stableData.nodes.map((collection: any) => {
                return (
                  <Link className='btn__primary text-center' aria-label='link' to={`/collections/${collection.handle}`} key={collection.id}>
                    Zum Shop
                  </Link>
                );
              })}
            </div>    
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex justify-center align-center flex-col">

          <div className='flex gap-5 flex-col px-10 py-5 h-full max-h-[50%] my-auto bg-[#0f0f0f]'>
            <div className='m-auto'>
              <h2>Finde tolle Produkte</h2>
              <p>...die zu dir passen.</p>
              {stableData.nodes.map((collection: any) => {
                return (
                  <Link className='btn__primary text-center' aria-label='link' to={`/collections/${collection.handle}`} key={collection.id}>
                    Zum Shop
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </>
      )
    }} />
    <Footer />
  </>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        products(first: 100) {
          edges {
          node {
          id
          handle
          title
          media(first: 10) {
            nodes {
              ... on MediaImage {
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
              ... on Model3d {
                id
                mediaContentType
                sources {
                  mimeType
                  url
                }
              }
            }
          }
          }
          }
          }
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
