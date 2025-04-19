// User can search for country and choose to hover over it

import React, {useContext, useEffect, useState} from 'react';
import { ctx } from './GlobeBackgroundProvider';
import ReactSearchBox from "react-search-box";
import Button from '@mui/material/Button';

function UserInput() {
    const {setCurrentCountryName} = useContext(ctx); // Current country that is selected
    const {toggleFocus} = useContext(ctx); // Toggle hovering
    const [data, setData] = useState([]) // Country searching
    const [inputValue, updateInputValue] = useState(""); // Country name that user input

    // Load data for country searching
    useEffect(() => {
        fetch('countrySearch.json').then(res => res.json()).then(setData);
    }, []);


    // What to do upon clicking the SELECT button
    const selectBtnClick = () => {
    }

    return(
    <div id='container'>
        <div class="title">EtymoMap</div><br/>
        <div className="search-box">
            <div style={{display: 'inline-block', marginRight: '10px'}}>
            <ReactSearchBox
                placeholder = "Enter a word" // Default text
                value=""
                data = {[]}
                onSelect={(record) => updateInputValue(record.item.value)}
                disabled="true"/>
            </div>

        <div className="button"><Button
            id='selectBtn'
            variant="contained"
            onClick={selectBtnClick}
        >Search</Button></div>
        </div>

        <br/><br/>
        <p class="description">From the viking invasions to the Norman-French conquest in 1066, and from post-Renaissance neologisms to its status as a global lingua franca, the English language boasts a fascinating history and development. Despite its origins as a West Germanic language, over two-thirds of the English lexicon consists of Romance vocabulary, mainly from French and Latin, with signiciant influence from Old Norse, Greek, and many others as well.</p>
        <p class="description">Search for any word in the English language and view a visualization of various linguistic data surrounding its etymology and other attributes.</p>
    </div>
    )
}

export default UserInput;