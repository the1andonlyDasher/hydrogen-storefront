
import { Carousel } from "@components/Carousel";
import {SDiv} from "@components/ScrollDiv";
import { globalScroll } from "@components/atoms";
import { motion, useScroll, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

const About = () => {
  const ref = useRef<any>(!null);
  const caption = useRef<any>(!null);
  const progress = useRef<any>(!null);
  const scroll:any = useRef<any>(0);
  const [gScroll, setgScroll] = useAtom(globalScroll)
  const first = useRef<any>(!null);
  const second = useRef<any>(!null);
  const third = useRef<any>(!null);
  const fourth = useRef<any>(!null);
  const fifth = useRef<any>(!null);
  const sixth = useRef<any>(!null);
  const seventh = useRef<any>(!null);
  const eighth = useRef<any>(!null);
  const ninth = useRef<any>(!null);
  const tenth = useRef<any>(!null);
  const list = useRef<any>(!null);
  const {scrollYProgress}:any = useScroll({container:ref})
  const scaleX = useSpring(scrollYProgress)
  const x = useSpring(scrollYProgress)
 
  useEffect(()=>{
    setgScroll(scroll)
  },[scroll]);

  const names = [
    "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"
  ]
  
  return (<>
  <div className="fixed bottom-0 left-0 w-full h-auto z-30">
    <div className="w-full h-20 p-5 flex relative top-0 left-0">
    <Carousel input={names}/>
    </div>
    {/* <ul ref={list} style={{left:scroll.current.toFixed(2) + "%"}} className="menu absolute flex left-0 top-[-300%] z-40 w-full h-full flex-row justify-evenly">
      <li className="px-6" onClick={()=>{first.current.scrollIntoView({behavior:"smooth"})}}>Kopfsache</li>
      <li className="px-6" onClick={()=>{second.current.scrollIntoView({behavior:"smooth"})}}>Kunde</li>
      <li className="px-6" onClick={()=>{third.current.scrollIntoView({behavior:"smooth"})}}>Haarschnitt</li>
      <li className="px-6" onClick={()=>{fourth.current.scrollIntoView({behavior:"smooth"})}}>Entspannung</li>
      <li className="px-6" onClick={()=>{fifth.current.scrollIntoView({behavior:"smooth"})}}>Kommunikation</li>
      <li className="px-6" onClick={()=>{sixth.current.scrollIntoView({behavior:"smooth"})}}>Beruf</li>
      <li className="px-6" onClick={()=>{seventh.current.scrollIntoView({behavior:"smooth"})}}>Zusammenarbeit</li>
      <li className="px-6" onClick={()=>{eighth.current.scrollIntoView({behavior:"smooth"})}}>Bewegung</li>
      <li className="px-6" onClick={()=>{ninth.current.scrollIntoView({behavior:"smooth"})}}>Geborgenheit</li>
      <li className="px-6" onClick={()=>{tenth.current.scrollIntoView({behavior:"smooth"})}}>Ziel</li>
    </ul> */}
    <div className="relative w-full h-2">
    <motion.div ref={progress} className="absolute left-0 h-full bg-[#333] w-full z-[-1] origin-left" style={{scaleX}}></motion.div>
    <motion.svg  className="z-10 absolute bottom-0 left-0 h-full w-full" style={{x}}>
  <line x1="0" y1="0" x2="100%" y2="0" style={{stroke:"#111", strokeWidth:16, strokeDasharray:2, strokeDashoffset:1 }}/>
</motion.svg>
</div>
  </div>
    <div
      ref={ref}
      onScroll={(e: any) => {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
         progress.current.style.width = scaleX
        // list.current.style.left = scroll.current.toFixed(2) * 100 + "%"
      }}
      className="mainScroll scroll scrollbar-hide">
      <SDiv props={{
        ref:first, 
        height:"200vh", 
        id:"first", 
        children:(<>
        <h1 >Nur Kopfsache</h1>
        <p className="mr-auto my-4">Seit 2009 übe ich mit Hingabe und Begeisterung den Beruf des Friseurs aus und führe seit 2018 meinen eigenen Salon. Meine Leidenschaft für dieses Handwerk ist nicht nur eine Karriere, sondern eine Lebensweise, die es mir ermöglicht, Menschen glücklich zu machen und ihnen ein strahlendes Lächeln ins Gesicht zu zaubern.
        </p>
      </>)}}
      />
      <SDiv props={{height:"200vh", id:"second", ref:second, children:(
        <>
                <h1>Der Kunde ist König</h1>
        <p className="mr-auto my-4">Bei mir steht der Kunde im Mittelpunkt. Mein oberstes Ziel ist es, Ihre individuellen Wünsche und Bedürfnisse zu verstehen und diese in einzigartige Frisuren umzusetzen, die Ihre Persönlichkeit unterstreichen. Egal, ob Sie eine klassische oder moderne Frisur bevorzugen, ob Sie eine Veränderung wünschen oder einfach nur verwöhnt werden möchten, ich stehe Ihnen mit Rat und Tat zur Seite.
        </p>
        </>
      )}}/>
      <SDiv props={{height:"200vh", id:"third", ref:third, children:(
        <>

        <h1>Mehr als ein Haarschnitt</h1>
        <p className="mr-auto my-4">Mein Team und ich legen großen Wert auf Qualität und Innovation. Wir bleiben stets auf dem neuesten Stand der Trends und Techniken, um Ihnen die bestmöglichen Ergebnisse zu liefern. Wir verwenden hochwertige Produkte, die Ihrem Haar die Pflege und Aufmerksamkeit schenken, die es verdient. Ihre Zufriedenheit steht für uns an erster Stelle.
          Neben erstklassigen Haarschnitten bieten wir auch eine Vielzahl weiterer Services an.
        </p>
        </>
        )}}/>
      <SDiv props={{height:"200vh", id:"fourth", ref:fourth, children:(
        <>
        <h1>Entspannung</h1>
        <p className="mr-auto my-4">
          Unsere Leistungen umfassen unter anderem professionelles Styling für besondere Anlässe, Farbveränderungen, Haarverlängerungen und - verdichtungen sowie entspannende Kopf - und Haarpflegebehandlungen. In unserem Salon können Sie sich verwöhnen lassen und eine Auszeit vom Alltag genießen.
        </p>
        </>)}}/>
      <SDiv  props={{height:"200vh", id:"fifth", ref:fifth, children:(
        <>
        <h1>Kommunikation</h1>
        <p className="mr-auto my-4">
          In unserem Salon erwartet Sie nicht nur ein Friseurbesuch, sondern ein einzigartiges Erlebnis. Unsere angenehme und entspannte Atmosphäre lässt Sie den Stress des Tages vergessen und sich vollkommen fallen lassen. Wir legen großen Wert auf eine persönliche und individuelle Betreuung, um sicherzustellen, dass Sie sich bei uns rundum wohl fühlen.
          Kundenfeedback ist uns besonders wichtig.
        </p>
      </>)}}/>
      <SDiv  props={{height:"200vh", id:"sixth", ref:sixth, children:(
        <>
        <h1>Nicht nur Beruf</h1>
        <p className="mr-auto my-4">
          Wir freuen uns über jede Rückmeldung, denn sie hilft uns dabei uns kontinuierlich zu verbessern und unsere Dienstleistungen an Ihre Bedürfnisse anzupassen. Ihr Vertrauen ist für uns die größte Motivation, unsere
          Leidenschaft für den Friseurberuf Tag für Tag zu leben.
        </p>
        </>)}}/>
      <SDiv  props={{height:"200vh", id:"seventh", ref:seventh, children:(
        <>
        <h1>Zusammenarbeit</h1>
        <p className="mr-auto my-4"> Seit 2020 bin ich stolz darauf, Teil dieses wunderbaren Salons zu sein und meiner Leidenschaft für das Friseurhandwerk nachzugehen.Die Arbeit als Friseur erfüllt mich mit Freude und Begeisterung, und ich strebe danach, das Beste aus jedem meiner Kunden herauszuholen.Mein Ziel ist es, Ihnen ein außergewöhnliches Erlebnis zu bieten und Ihnen mit meiner Expertise zu einem unverwechselbaren Look zu verhelfen.
        </p>
      </>)}}/>
      <SDiv  props={{height:"200vh", id:"eighth", ref:eighth, children:(
        <>
        <h1>In Bewegung</h1>
        <p className="mr-auto my-4">
          Für mich ist es von großer Bedeutung, mich stetig weiterzubilden und mit den neuesten Trends und Techniken vertraut zu sein. Die Friseurbranche ist dynamisch und entwickelt sich kontinuierlich weiter.Daher investiere ich viel Zeit und Energie in meine Weiterbildung, um sicherzustellen, dass ich Ihnen immer die aktuellsten und innovativsten Lösungen bieten kann. Durch regelmäßige Schulungen und Workshops halte ich mich über die neuesten Schnitt - und Stylingtechniken auf dem Laufenden.
        </p>
      </>)}}/>
      <SDiv  props={{height:"200vh", id:"ninth", ref:ninth, children:(
        <>
         <h1>Geborgenheit</h1>
        <p className="mr-auto my-4">Neben meinem Streben nach Exzellenz in der Arbeit als Friseur bin ich bestrebt, Ihnen ein angenehmes und entspanntes Erlebnis zu bieten.Ich schaffe eine warme und einladende Atmosphäre, in der Sie sich wohlfühlen und den Alltagsstress hinter sich lassen können.Mein Ziel ist es, dass Sie sich bei mir wohl und gut aufgehoben fühlen, während ich mich mit Hingabe um Ihre Haare Kümmere.
        </p>
      </>)}}/>
      <SDiv  props={{height:"200vh", id:"tenth", ref:tenth, children:(
        <>
        <h1>Ans Ziel</h1>
        <p className="mr-auto my-4">
         Vereinbaren Sie noch heute einen Termin und lassen Sie uns gemeinsam das Beste aus Ihrem Haar herausholen. Mit Simon Speier haben Sie einen Friseur an Ihrer Seite, der mit Liebe zum Detail Ihre Erwartungen übertreffen wird.
        </p>
      </>)}}/>
      {/* <span className="caption" ref={caption}>
        0.00
      </span> */}
    </div>
  </>);
};

export default About;


// Seit 2009 übe ich mit Hingabe und Begeisterung den Beruf des Friseurs aus und führe seit 2018 meinen eigenen Salon.Meine Leidenschaft für dieses Handwerk ist nicht nur eine Karriere, sondern eine Lebensweise, die es mir ermöglicht, Menschen glücklich zu machen und ihnen ein strahlendes Lächeln ins Gesicht zu zaubern
// Bei mir steht der Kunde im Mittelpunkt.Mein oberstes Ziel ist es, Ihre individuellen Wünsche und Bedürfnisse zu verstehen und diese in einzigartige Frisuren umzusetzen, die Ihre Persönlichkeit unterstreichen.Egal, ob Sie eine klassische oder moderne Frisur bevorzugen, ob Sie eine Veränderung wünschen oder einfach nur verwöhnt werden möchten, ich stehe Ihnen mit Rat und Tat zur Seite.
// Mein Team und ich legen großen Wert auf Qualität und Innovation.Wir bleiben stets auf dem neuesten Stand der Trends und Techniken, um Ihnen die bestmöglichen Ergebnisse zu liefern.Wir verwenden hochwertige Produkte, die Ihrem Haar die Pflege und Aufmerksamkeit schenken, die es verdient.Ihre Zufriedenheit steht für uns an erster Stelle.
// Neben erstklassigen Haarschnitten bieten wir auch eine Vielzahl weiterer Services an.
// Unsere Leistungen umfassen unter anderem professionelles Styling für besondere Anlässe, Farbveränderungen, Haarverlängerungen und - verdichtungen sowie entspannende Kopf - und Haarpflegebehandlungen.In unserem Salon können Sie sich verwöhnen lassen und eine Auszeit vom Alltag genießen.
// Bei Stephan Müller erwartet Sie nicht nur ein Friseurbesuch, sondern ein einzigartiges Erlebnis.Unsere angenehme und entspannte Atmosphäre lässt Sie den Stress des Tages vergessen und sich vollkommen fallen lassen.Wir legen großen Wert auf eine persönliche und individuelle Betreuung, um sicherzustellen, dass Sie sich bei uns rundum wohl fühlen.
// Kundenfeedback ist uns besonders wichtig.Wir freuen uns über jede Rückmeldung.denn sie hilft uns, uns kontinuierlich zu verbessern und unsere Dienstleistungen an Ihre Bedürfnisse anzupassen.Ihr Vertrauen ist für uns die größte Motivation, unsere
// Leidenschaft für den Friseurberuf Tag für Tag zu leben.
// Besuchen Sie uns in unserem Salon und lassen Sie sich von unserer Leidenschaft für das Friseurhandwerk überzeugen.Wir freuen uns darauf, Ihnen zu einem neuen Look zu verhelfen und Ihnen ein Lächeln ins Gesicht zu zaubern.Vereinbaren Sie noch heute einen Termin und erleben Sie den Unterschied bei Stephan Müller - Ihrem Friseurmeister aus Leidenschaft! L§ (Strg)
// Seit 2020 bin ich stolz darauf, Teil dieses wunderbaren Salons zu sein und meiner Leidenschaft für das Friseurhandwerk nachzugehen.Die Arbeit als Friseur erfüllt mich mit Freude und Begeisterung, und ich strebe danach, das Beste aus jedem meiner Kunden herauszuholen.Mein Ziel ist es, Ihnen ein außergewöhnliches Erlebnis zu bieten und Ihnen mit meiner Expertise zu einem unverwechselbaren Look zu verhelfen
// Für mich ist es von großer Bedeutung, mich stetig weiterzubilden und mit den neuesten Trends und Techniken vertraut zu sein.Die Friseurbranche ist dynamisch und entwickelt sich kontinuierlich weiter.Daher investiere ich viel Zeit und Energie in meine Weiterbildung, um sicherzustellen, dass ich Ihnen immer die aktuellsten und innovativsten Lösungen bieten kann.Durch regelmäßige Schulungen und Workshops halte ich mich über die neuesten Schnitt - und Stylingtechniken auf dem Laufenden.
// Neben meinem Streben nach Exzellenz in der Arbeit als Friseur bin ich bestrebt, Ihnen ein angenehmes und entspanntes Erlebnis zu bieten.Ich schaffe eine warme und einladende Atmosphäre, in der Sie sich wohlfühlen und den Alltagsstress hinter sich lassen können.Mein Ziel ist es, dass Sie sich bei mir wohl und gut aufgehoben fühlen, während ich mich mit Hingabe um Ihre Haare Kümmere.
// Ich freue mich darauf, sie im Salon begrüßen zu dürfen und Ihnen mit meiner Leidenschaft für das Friseurhandwerk ein strahlendes Lächeln ins Gesicht zu zaubern.
// Vereinbaren Sie noch heute einen Termin und lassen Sie uns gemeinsam das Beste aus Ihrem Haar herausholen.Mit Simon Speier haben Sie einen Friseur an Ihrer Seite, der mit Liebe zum Detail Ihre Erwartungen übertreffen wird,

// Besuchen Sie uns in unserem Salon und lassen Sie sich von unserer Leidenschaft für das Friseurhandwerk überzeugen. Wir freuen uns darauf, Ihnen zu einem neuen Look zu verhelfen und Ihnen ein Lächeln ins Gesicht zu zaubern. Vereinbaren Sie noch heute einen Termin und erleben Sie den Unterschied bei Stephan Müller - Ihrem Friseurmeister aus Leidenschaft!
// Ich freue mich darauf, sie im Salon begrüßen zu dürfen und Ihnen mit meiner Leidenschaft für das Friseurhandwerk ein strahlendes Lächeln ins Gesicht zu zaubern.
