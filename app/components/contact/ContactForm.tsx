import React, { useEffect, useRef, useState } from "react";
import { useAnimationControls, motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
emailjs.init("lPNDYXO-4WREGEgyS");

type props = {
  title?: string, 
  subtitle?: string, 
  sectionName?: string, 
  id?: string
}

interface contactProps {
  props: props
}

const SvgComponent = (props:any) => (
  <svg
    width={3.988}
    height={6.983}
    viewBox="0 0 1.055 1.848"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1.016.831a.13.13 0 0 1 0 .185l-.793.794a.131.131 0 0 1-.186-.185L.736.924.037.223A.131.131 0 0 1 .223.037z" />
  </svg>
);


const ContactForm = ({ props }: contactProps) => {
  const form = useRef<any>(false);

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [firstName, setFirstName] = useState("");
  const controlsForm = useAnimationControls();
  const messageControls = useAnimationControls();
  const inView = useInView(form, { once: true, margin: "100px 0px 100px 0px" });

  const variants = {
    initial: { opacity: 0},
    enter: {
      opacity: 1,
      transition: { ease: "easeIn", duration: 0.5, delay: 0.5 },
    },
    exit: { opacity: 0},
  }

  const formVariants = {
    initial: { opacity: 0},
    enter: {
      opacity: 1,
      transition: { ease: "easeIn", duration: 0.5, delay: 0.5, staggerChildren: 0.2 },
    },
    exit: { opacity: 0},
  };
  const messageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, display: "flex" },
    exit: { opacity: 0, display: "none" },
  };
  const sequence = async () => {
    await controlsForm.start("exit");
    return await messageControls.start("enter");
  };

  const [status, setStatus] = useState("Abschicken");

  const bringBackform = async (e:any) => {
    e.preventDefault();
    await messageControls.start("exit");
    return await controlsForm.start("enter");
  };

  const testMail = (e:any) => {
    e.preventDefault();
    setStatus("Sendet...");
    setTimeout(() => {
      setStatus("Versandt!");
      setTimeout(() => {
        setStatus("Abschicken");
      }, 1000);
      setFirstName("");
      setEmail("")
      setMessage("")
      sequence();
    }, 1000);
  };
  const sendEmail = (e:any) => {
    e.preventDefault();
    setStatus("Sendet...");
    emailjs
      .sendForm(
        "service_svvit4h",
        "template_t5ebzez",
        form.current,
        "lPNDYXO-4WREGEgyS"
      )
      .then(
        (result) => {
          setStatus("Versandt!");
          setTimeout(() => {
            setStatus("Abschicken");
          }, 1000);
          sequence();
          setFirstName("");
          setEmail("")
          setMessage("")
        },
        (error) => {
          setStatus("Ups...");
          alert("Konnte Nachricht nicht versenden...");
        }
      );
  };

  useEffect(() => {
    if (inView) {
      controlsForm.start("enter");
    }
  }, [inView, controlsForm]);

  return (
    <>
        <section data-section-name={props.sectionName} id={props.id} className="">
      <div className="__s__b sec-pad_left sec-pad_right">
        <h2 data-before={props.title}>{props.title}</h2>
        <p>{props.subtitle}</p>
      <motion.div
        className="thanks__message"
        variants={messageVariants}
        initial="initial"
        animate={messageControls}
        exit="exit"
      >
        <h4>Vielen Dank!</h4>
        <p>Wir werden Ihre Anfrage bearbeiten und Sie kontaktieren.</p>
        <button className="btn__outline" onClick={bringBackform}>
          Weitere E-Mail schreiben
        </button>
      </motion.div>
      <motion.form
        ref={form}
        onSubmit={sendEmail}
        variants={formVariants}
        initial="initial"
        animate={controlsForm}
        exit="exit"
      >
        <input type="hidden" name="contact_number"></input>
        <motion.div variants={variants}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="user_name"
            // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
            value={firstName}
            placeholder={"Name"} // ...force the input's value to match the state variable...
            onChange={e => setFirstName(e.target.value)} 
            required
          />
        </motion.div>
        <motion.div variants={variants}>
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="user_email"
            // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
            value={email}
            placeholder="E-Mail"
            onChange={e => setEmail(e.target.value)}
            required
            aria-describedby="emailHelp"
          />
        </motion.div>
        <motion.div variants={variants}>
          <label htmlFor="message">Nachricht:</label>
          <textarea
            value={message}
            placeholder="Deine Nachricht..."
            onChange={e => setMessage(e.target.value)}
            name="message"
            // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
            id="message"
            required
            rows={5}
          />
        </motion.div>
        <motion.button variants={variants} className="btn__primary" type="submit">
          {status}
        </motion.button>
      </motion.form>
      </div>
      </section>
    </>
  );
};

export default ContactForm;
