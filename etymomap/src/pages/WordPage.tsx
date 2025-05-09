import React, {useState, useEffect, useContext } from 'react'
import {ctx} from '../components/GlobeBackgroundProvider'
import { WordOption } from '../WordOption'
import {EtymologyBot} from '../OpenAI/EtymologyBot.ts';
import BackButton from '../components/BackButton'
import Description from '../components/Description'

// Function to change the page, and reference to current selected word
interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    currentWordOption: WordOption;
}

const WordPage = ({setActivePage, currentWordOption}: Props) => {

    // Store the word and its definition as strings for quick reference
    const [word, _]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.word) // Store word for quick access
    const [definition, setDefinition]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.definition);
    const [etymology, setEtymology]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.ref[currentWordOption.wordIndex].getEtymology());

    const {toggleFocus} = useContext(ctx); // Toggle hovering
    // const [countries, setCountries]: [{}, React.Dispatch<React.SetStateAction<{}>>] = useState();

    const countries = {
        "Middle French":[
            "France"
        ],
        "Latin":[
            "Italy",
            "France",
            "Spain",
            "Portugal",
            "Romania"
        ],
        "Middle English":[
            "United Kingdom"
        ],
        "Old English":[
            "United Kingdom"
        ],
        "Greek":[
            "Greece"
        ],
        "Anglo-French":[
            "France"
        ],
        "Old Dutch":[
            "Netherlands"
        ],
        "Old High German":[
            "Germany"
        ],
        "Middle High German":[
            "Germany"
        ],
        "Sanskrit":[
            "Syria"
        ],
        "Gothic":[
            "Sweden",
            "Denmark",
            "Germany",
            "Poland"
        ],
        "Old Norse":[
            "Sweden",
            "Norway",
            "Denmark",
            "Iceland"
        ],
        "Avestan":[
            "Iran"
        ],
        "Italian":[
            "Italy"
        ]
        }

    useEffect(() => {
        // toggleFocus(["United Kingdom", "Germany", "Greece"]);

        runGptModel()
    }, []);

    const convertLang = (language) => {
        return countries[language];
    }

    const runGptModel = async () => {
        const client = new EtymologyBot(process.env.REACT_APP_OPENAI_API_KEY);

        // Get LLM to process languages into neat, comma-separated list
        let gptList = await client.processEtymologyIntoList(etymology);
        setEtymology(gptList); // Update component

        // Get corresponding countries of origin from the languages
        let languages = gptList.replace(/(, )/g, ",").split(",")
        let countriesOfOrigin: string[] = [];
        for (let i = 0; i < languages.length; i++) {
            let results = convertLang(languages[i]);
            for (let j = 0; j < results.length; j++)
                countriesOfOrigin.push(results[j]);
        }

        // Hover over those countries
        toggleFocus(Array.from(new Set(countriesOfOrigin)));

        // If there is weird punctuation in the definition, semantically clean it
        if (definition!.match(/[\/#!$%\^&\*;:{}=\-_`~—]/))
            setDefinition(await client.simplifyDefinition(definition));
    }

    return (
        <>
            <BackButton setActivePage={setActivePage} toggleFocus={toggleFocus}/>

            <h1 className="font-bold text-2xl">{word}</h1><br/>
            <Description text={`Definition: ${definition}`}/>
            <Description text={`First use: ${currentWordOption.ref[currentWordOption.wordIndex].getFirstUse().replace(/{(.*?)}/, "").replace(/circa/, "")}`}/>
            <Description text={`${currentWordOption.ref[currentWordOption.wordIndex].getPartOfSpeech()}`}/>
            <Description text={`Origin: ${etymology}`}/>
            
                                                      
        </>
    );
}

export default WordPage;