import ScrollDiv from "@components/ScrollDiv";
import { globalScroll } from "@components/atoms";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

const About = () => {
  const ref = useRef<any>(!null);
  const caption = useRef<any>(!null);
  const progress = useRef<any>(!null);
  const scroll:any = useRef<any>(0);
  const [gScroll, setgScroll] = useAtom(globalScroll)
 
  useEffect(()=>{
    setgScroll(scroll)
    console.log(progress)
  },[scroll]);
  
  return (<>
  <div className="fixed bottom-0 left-0 w-full h-3">
    <div ref={progress} className="absolute left-0 h-full bg-[#333] w-0" style={{width:scroll.current.toFixed(2)}}></div>
    <div className="w-full left-0 bottom-0 h-0 absolute z-[10] border-dashed border-3 border-[#111]"></div>
  </div>
    <div
      ref={ref}
      onScroll={(e: any) => {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
        // caption.current.innerText = scroll.current.toFixed(2) * 100
        progress.current.style.width = scroll.current.toFixed(2) * 100 +"%";
      }}
      className="mainScroll scroll">
      <ScrollDiv height={"200vh"}>
        <h1>Nur Kopfsache</h1>
        <p className="mr-auto my-4">Seit 2009 übe ich mit Hingabe und Begeisterung den Beruf des Friseurs aus und führe seit 2018 meinen eigenen Salon. Meine Leidenschaft für dieses Handwerk ist nicht nur eine Karriere, sondern eine Lebensweise, die es mir ermöglicht, Menschen glücklich zu machen und ihnen ein strahlendes Lächeln ins Gesicht zu zaubern.
        </p>
      </ScrollDiv>
      <ScrollDiv height={"200vh"}>

        <h1>Der Kunde ist König</h1>
        <p className="mr-auto my-4">Bei mir steht der Kunde im Mittelpunkt. Mein oberstes Ziel ist es, Ihre individuellen Wünsche und Bedürfnisse zu verstehen und diese in einzigartige Frisuren umzusetzen, die Ihre Persönlichkeit unterstreichen. Egal, ob Sie eine klassische oder moderne Frisur bevorzugen, ob Sie eine Veränderung wünschen oder einfach nur verwöhnt werden möchten, ich stehe Ihnen mit Rat und Tat zur Seite.
        </p>

      </ScrollDiv>
      <ScrollDiv height={"200vh"}>

        <h1>Mehr als ein Haarschnitt</h1>
        <p className="mr-auto my-4">Mein Team und ich legen großen Wert auf Qualität und Innovation. Wir bleiben stets auf dem neuesten Stand der Trends und Techniken, um Ihnen die bestmöglichen Ergebnisse zu liefern. Wir verwenden hochwertige Produkte, die Ihrem Haar die Pflege und Aufmerksamkeit schenken, die es verdient. Ihre Zufriedenheit steht für uns an erster Stelle.
          Neben erstklassigen Haarschnitten bieten wir auch eine Vielzahl weiterer Services an.
        </p>


      </ScrollDiv>
      <ScrollDiv height={"200vh"}>

        <h1>Entspannung</h1>
        <p className="mr-auto my-4">
          Unsere Leistungen umfassen unter anderem professionelles Styling für besondere Anlässe, Farbveränderungen, Haarverlängerungen und - verdichtungen sowie entspannende Kopf - und Haarpflegebehandlungen. In unserem Salon können Sie sich verwöhnen lassen und eine Auszeit vom Alltag genießen.
        </p>
      </ScrollDiv>
      <ScrollDiv height={"200vh"}>

        <h1>Kommunikation</h1>
        <p className="mr-auto my-4">
          In unserem Salon erwartet Sie nicht nur ein Friseurbesuch, sondern ein einzigartiges Erlebnis. Unsere angenehme und entspannte Atmosphäre lässt Sie den Stress des Tages vergessen und sich vollkommen fallen lassen. Wir legen großen Wert auf eine persönliche und individuelle Betreuung, um sicherzustellen, dass Sie sich bei uns rundum wohl fühlen.
          Kundenfeedback ist uns besonders wichtig.
        </p>
      </ScrollDiv>
      <ScrollDiv height={"200vh"}>

        <h1>Nicht nur Beruf</h1>
        <p className="mr-auto my-4">
          Wir freuen uns über jede Rückmeldung, denn sie hilft uns dabei uns kontinuierlich zu verbessern und unsere Dienstleistungen an Ihre Bedürfnisse anzupassen. Ihr Vertrauen ist für uns die größte Motivation, unsere
          Leidenschaft für den Friseurberuf Tag für Tag zu leben.
        </p></ScrollDiv>
      <ScrollDiv height={"200vh"}>
        <h1>Zusammenarbeit</h1>
        <p className="mr-auto my-4"> Seit 2020 bin ich stolz darauf, Teil dieses wunderbaren Salons zu sein und meiner Leidenschaft für das Friseurhandwerk nachzugehen.Die Arbeit als Friseur erfüllt mich mit Freude und Begeisterung, und ich strebe danach, das Beste aus jedem meiner Kunden herauszuholen.Mein Ziel ist es, Ihnen ein außergewöhnliches Erlebnis zu bieten und Ihnen mit meiner Expertise zu einem unverwechselbaren Look zu verhelfen.
        </p>
      </ScrollDiv>
      <ScrollDiv height={"200vh"}>
      <h1>In Bewegung</h1>
        <p className="mr-auto my-4">
          Für mich ist es von großer Bedeutung, mich stetig weiterzubilden und mit den neuesten Trends und Techniken vertraut zu sein. Die Friseurbranche ist dynamisch und entwickelt sich kontinuierlich weiter.Daher investiere ich viel Zeit und Energie in meine Weiterbildung, um sicherzustellen, dass ich Ihnen immer die aktuellsten und innovativsten Lösungen bieten kann. Durch regelmäßige Schulungen und Workshops halte ich mich über die neuesten Schnitt - und Stylingtechniken auf dem Laufenden.
        </p>
      </ScrollDiv>
      <ScrollDiv height={"200vh"}>
      <h1>Geborgenheit</h1>
        <p className="mr-auto my-4">Neben meinem Streben nach Exzellenz in der Arbeit als Friseur bin ich bestrebt, Ihnen ein angenehmes und entspanntes Erlebnis zu bieten.Ich schaffe eine warme und einladende Atmosphäre, in der Sie sich wohlfühlen und den Alltagsstress hinter sich lassen können.Mein Ziel ist es, dass Sie sich bei mir wohl und gut aufgehoben fühlen, während ich mich mit Hingabe um Ihre Haare Kümmere.
        </p>
      </ScrollDiv>
      <ScrollDiv height={"200vh"}>
        <h1>Ans Ziel</h1>
        <p className="mr-auto my-4">
         Vereinbaren Sie noch heute einen Termin und lassen Sie uns gemeinsam das Beste aus Ihrem Haar herausholen. Mit Simon Speier haben Sie einen Friseur an Ihrer Seite, der mit Liebe zum Detail Ihre Erwartungen übertreffen wird.
        </p>
      </ScrollDiv>
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
