
const style = `
input[type=range] {
  width: 100%;
  background-color: white;
  -webkit-appearance: none;
  border: 0;
  margin: 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #ffffff;
  width: 100%;
  height: 4px;
  cursor: pointer;
}
input[type=range]::-webkit-slider-thumb {
  margin-top: -9px;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  -webkit-appearance: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #ffffff;
}
input[type=range]::-moz-range-track {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #ffffff;
  width: 100%;
  height: 4px;
  cursor: pointer;
}
input[type=range]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}
input[type=range]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 8px 0;
  color: transparent;
  width: 100%;
  height: 4px;
  cursor: pointer;
}
input[type=range]::-ms-fill-lower {
  background: #ffffff;
  border: 1px solid #ffffff;
}
input[type=range]::-ms-fill-upper {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #ffffff;
}
input[type=range]::-ms-thumb {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 0px;
}
input[type=range]:focus::-ms-fill-lower {
  background: rgba(255, 255, 255, 0.6);
}
input[type=range]:focus::-ms-fill-upper {
  background: #ffffff;
}
@supports (-ms-ime-align:auto) {
  input[type=range] {
    margin: 0;
  }
}

#future_amount::-ms-thumb {
  background: #65D6AD !important;
}

#future_amount::-moz-range-thumb {
  background: #65D6AD !important;
}

#future_amount::-webkit-slider-thumb {
  background: #65D6AD !important;
}


  .ISACalculator-module {
     width: 100%;
     max-width: 512px;
     border-radius: 10px;
     overflow: hidden;
     margin: 0 auto;
  }
   .ISACalculator-module header {
     background: #19216c;
     color: white;
     font-family: Heebo, sans-serif;
     font-style: normal;
     font-weight: 500;
     font-size: 16px;
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 12px 0;
  }
   .ISACalculator-module header h2 {
     font-weight: normal;
  }
   .ISACalculator-module .body .slider-wrapper {
     background: #4c63b6;
     padding: 20px 16px;
  }
   .ISACalculator-module .body .slider-wrapper .titles {
     display: grid;
     grid-template-columns: 1fr 1fr;
  }
   .ISACalculator-module .body .slider-wrapper .titles h2 {
     font-family: Heebo-Bold, sans-serif;
     font-style: normal;
     font-weight: 500;
     font-size: 14px;
     text-transform: uppercase;
     color: #bed0f7;
  }
   .ISACalculator-module .body .slider-wrapper .titles p {
     color: white;
     font-family: Heebo-Bold, sans-serif;
     font-style: normal;
     font-weight: 500;
     font-size: 16px;
  }
   .ISACalculator-module .body .slider-wrapper .future-bill {
     display: flex;
     justify-content: space-between;
     margin-top: 20px;
     padding-top: 20px;
     border-top: 1px solid #fff 33;
  }
   .ISACalculator-module .body .slider-wrapper .future-bill label {
     font-family: Heebo, sans-serif;
     font-style: normal;
     font-weight: 500;
     font-size: 14px;
     text-transform: uppercase;
     color: #bed0f7;
  }
   .ISACalculator-module .body .slider-wrapper .future-bill p {
     color: white;
     font-family: Heebo-Bold, sans-serif;
     font-style: normal;
     font-weight: 500;
     font-size: 16px;
  }
  .Slider-component {
    height: 20px;
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .empty-line {
    height: 4px;
    width: 100%;
    background: #ffffff4d;
    border-radius: 3px;
    display: flex;
    justify-content: center;
  }
  
  .line {
    width: 100%
  }
`

let width = 30
const pe = document.getElementById('commit-muse-calc').parentElement

const calc = `
<section class="ISACalculator-module">
  <style>
    ${style}
  </style>
  <header>
    <h2>ISA Calculator</h2>
  </header>
  <div class="body">
    <div class="slider-wrapper">
      <div class="titles">
        <div>
          <h2>current income</h2>
          <p>10K / YEAR</p>
        </div>
        <div>
          <h2>future income</h2>
          <p>20K / YEAR</p>
        </div>
      </div>

      <section class="Slider-component">
        <div class="empty-line">
          <input class="line" value="10" min="0" max="100" step="1" id="current_amount" type="range" />
          <input class="line" value="10" min="0" max="100" step="1" id="future_amount" type="range" />
        </div>
      </section>

      <div class="future-bill">
        <label>Future Bill</label>
        <p>$41.25K / YEAR (17%)</p>
      </div>
    </div>
  </div>

</section>
`
pe.insertAdjacentHTML('beforeend', calc)


/*

  .filled-line {
    width: 20%;
    border-radius: 3px;
    background: linear-gradient(270deg, #65D6AD 0%, #FFFFFF 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .filled-line .right_area {
    left: 100%;
  }
  .filled-line .left_area {
    right: 100%;
  }
  .filled-line span.area {
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 1;
    background: darkred;
  }
  .filled-line span.dot {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: white;
    cursor: grab;
  }
  .filled-line span.dot:active {
    cursor: grabbing;
  }
  .filled-line #future_dot {
    background: #65D6AD;
  }
 */