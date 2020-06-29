const style = `input[type=range]{width:100%;background-color:#fff;-webkit-appearance:none;border:0;margin:0}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{background:rgba(255,255,255,.6);border:1px solid #fff;width:100%;height:4px;cursor:pointer}input[type=range]::-webkit-slider-thumb{margin-top:-9px;width:20px;height:20px;background:#fff;border:0;border-radius:20px;cursor:pointer;-webkit-appearance:none}input[type=range]:focus::-webkit-slider-runnable-track{background:#fff}input[type=range]::-moz-range-track{background:rgba(255,255,255,.6);border:1px solid #fff;width:100%;height:4px;cursor:pointer}input[type=range]::-moz-range-thumb{width:20px;height:20px;background:#fff;border:0;border-radius:20px;cursor:pointer}input[type=range]::-ms-track{background:0 0;border-color:transparent;border-width:8px 0;color:transparent;width:100%;height:4px;cursor:pointer}input[type=range]::-ms-fill-lower{background:#fff;border:1px solid #fff}input[type=range]::-ms-fill-upper{background:rgba(255,255,255,.6);border:1px solid #fff}input[type=range]::-ms-thumb{width:20px;height:20px;background:#fff;border:0;border-radius:20px;cursor:pointer;margin-top:0}input[type=range]:focus::-ms-fill-lower{background:rgba(255,255,255,.6)}input[type=range]:focus::-ms-fill-upper{background:#fff}@supports (-ms-ime-align:auto){input[type=range]{margin:0}}#future_amount::-ms-thumb{background:#65d6ad!important}#future_amount::-moz-range-thumb{background:#65d6ad!important}#future_amount::-webkit-slider-thumb{background:#65d6ad!important}.ISACalculator-module{width:100%;max-width:512px;border-radius:10px;overflow:hidden;margin:0 auto}.ISACalculator-module header{background:#19216c;color:#fff;font-family:Heebo,sans-serif;font-style:normal;font-weight:500;font-size:16px;display:flex;justify-content:center;align-items:center;padding:12px 0}.ISACalculator-module header h2{font-weight:400}.ISACalculator-module .body .slider-wrapper{background:#4c63b6;padding:20px 16px}.ISACalculator-module .body .slider-wrapper .titles{display:grid;grid-template-columns:1fr 1fr}.ISACalculator-module .body .slider-wrapper .titles h2{font-family:Heebo-Bold,sans-serif;font-style:normal;font-weight:500;font-size:14px;text-transform:uppercase;color:#bed0f7}.ISACalculator-module .body .slider-wrapper .titles p{color:#fff;font-family:Heebo-Bold,sans-serif;font-style:normal;font-weight:500;font-size:16px}.ISACalculator-module .body .slider-wrapper .future-bill{display:flex;justify-content:space-between;margin-top:20px;padding-top:20px;border-top:1px solid #ffffff33}.ISACalculator-module .body .slider-wrapper .future-bill label{font-family:Heebo,sans-serif;font-style:normal;font-weight:500;font-size:14px;text-transform:uppercase;color:#bed0f7}.ISACalculator-module .body .slider-wrapper .future-bill p{color:#fff;font-family:Heebo-Bold,sans-serif;font-style:normal;font-weight:500;font-size:16px}.Slider-component{height:20px;display:flex;align-items:center;margin-top:20px}.empty-line{height:4px;width:100%;background:#ffffff4d;border-radius:3px;display:flex;justify-content:center}.line{width:100%}`

let width = 30
const pe = document.getElementById('commit-muse-calc').parentElement

let _percentage = 17
let _months = 7
let _current_income = 95
let _future_income = 125
let _max = 100

const set_bill = (cur_income, fut_income) => {
    let bill = ((_percentage / 100) * fut_income) * (_months / 12)

    if (fut_income > _max) {
        bill = _max
    }

    if (bill > cur_income) {
        bill = 0
    }

    return document.getElementById('bill').innerText = bill.toFixed(2).toString()
}

const currentChange = (e) => {
    const val = Number(e.target.value)
    _current_income = val
    document.getElementById('current').innerText = e.target.value
    set_bill(val, _future_income)
}
const futureChange = (e) => {
    const val = Number(e.target.value)
    _future_income = val
    document.getElementById('future').innerText = e.target.value
    set_bill(_current_income, val)
}

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
          <p><span id="current">${_current_income}</span>K / YEAR</p>
        </div>
        <div>
          <h2>future income</h2>
          <p><span id="future">${_future_income}</span>K / YEAR</p>
        </div>
      </div>

      <section class="Slider-component">
        <div class="empty-line">
          <input onchange="currentChange(event)" class="line" value="${_current_income}" min="0" max="200" step="1" id="current_amount" type="range" />
          <input onchange="futureChange(event)" class="line" value="${_future_income}" min="0" max="200" step="1" id="future_amount" type="range" />
        </div>
      </section>

      <div class="future-bill">
        <label>Future Bill</label>
        <p>$<span id="bill">41.25</span>K / YEAR (17%)</p>
      </div>
    </div>
  </div>

</section>
`
pe.insertAdjacentHTML('beforeend', calc)
