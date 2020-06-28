
const style = `
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
  .filled-line span.right_dot {
    background: #65D6AD;
  }
`
let width = 20
const pe = document.getElementById('commit-muse-calc').parentElement
const dragLeft = (e) => {
  console.log('E LEft: ', e)
  const line = document.getElementById('amount')
  width += 10
  line.style.width = width + '%'
  console.log('width', width)
}
const dragRight = (e) => {
  console.log('E right: ', e)
}
const drag = (e) => {
  console.log('E right: ', e)
}
const calc = `
        <section class="ISACalculator-module">
          <style>${style}</style>
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
                <div style={{textAlign: 'right'}}>
                  <h2>future income</h2>
                  <p>20K / YEAR</p>
                </div>
              </div>
              
              <section class="Slider-component">
               <div class="empty-line">
                 <div class="filled-line" id="amount">
                   <span draggable="true" class="area left_area" ondragenter="dragLeft(event)"></span>
                   <span draggable="true" class="dot left_dot"></span>
                   <span draggable="true" class="dot right_dot"></span> 
                   <span draggable="true" class="area right_area" ondragenter="dragRight(event)"></span>                  
                 </div>
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
