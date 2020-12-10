import { useEffect, useMemo, useRef } from "react";

function Calculator({ tableau }) {
  const serviceRef = useRef(null)
  const autreServiceRef = useRef(null)


    if (!serviceRef.current) {
        serviceRef.current = new MonService()
    }
  }, [])

  useEffect(() => {
    serviceRef.current.
  }, [])

  return <p>{calculatedTableau.map(result => <Result result={result}/>)}</p>;
}

export default Calculator;
