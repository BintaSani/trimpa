'use client'
import React, {useState} from 'react'

type Props = {}

const PassengerForm = (props: Props) => {
    const [bags, setBags] = useState(1);

    const incrementBags = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setBags(bags + 1)
    };
    const decrementBags = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Prevent negative bag count
      if (bags > 0) setBags(bags - 1);
    };
  return (
    <div className='w-full'>
        <form className="w-full grid grid-cols-3 gap-4">
          
            <h4 className='text-gray-600 mt-9 mb-6 text-lg font-medium col-span-3'>Passenger 1 (Adult)</h4>
            {/* Row 1 */}
            <div className='col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4'>
                <input type="text" placeholder="First name*" className="input col-span-1" />
                <input type="text" placeholder="Middle" className="input col-span-1" />
                <input type="text" placeholder="Last name*" className="input col-span-1" />
            </div>

            {/* Row 2 */}
            <div className='col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4'>

                <input type="text" placeholder="Suffix" className="input h-fit col-span-1" />
                <div className="col-span-1 md:col-span-2">
                    <input type="text" placeholder="Date of birth*" className="input w-full md:w-[60%]" />
                    <p className="text-sm text-gray-500 mt-1">MM/DD/YY</p>
                </div>
            </div>
            <div className='col-span-3 lg:w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Row 3 */}
                <input type="email" placeholder="Email address*" className="input col-span-1" />
                <input type="tel" placeholder="Phone number*" className="input col-span-1" />

                {/* Row 4 */}
                <input type="text" placeholder="Redress number" className="input col-span-1" />
                <input type="text" placeholder="Known traveller number*" className="input col-span-1" />
            </div>
            
            <h4 className='text-gray-600 mt-12 mb-6 text-lg font-medium col-span-3'>Emergency contact information</h4>
            <div className='col-span-3 mb-6'>
                <input type="checkbox" name="same" id="same" className='mr-2' />
                <label htmlFor="same" className='text-base text-gray-600'>Same as passenger 1</label>
            </div>
            <div className='col-span-3 lg:w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Row 3 */}
                <input type="email" placeholder="first name*" className="input col-span-1" />
                <input type="tel" placeholder="last name*" className="input col-span-1" />

                {/* Row 4 */}
                <input type="text" placeholder="Email address" className="input col-span-1" />
                <input type="text" placeholder="Phone number*" className="input col-span-1" />
            </div>
            <h4 className='text-gray-600 mt-12 -mb-[11px] text-lg font-medium col-span-3'>Bag information</h4>
            <p className='text-lg font-normal text-gray-400 col-span-3'>Each passenger is allowed one free carry-on bag and one personal item. 
                First checked bag for each passenger is also free. 
                Second bag check fees are waived for loyalty program members. 
                See the <span className='text-[var(--color-purple-blue)]'>full bag policy.</span>
            </p>
            <div className="col-span-3 ">
                {/* Header Row */}
                <div className="flex justify-between w-[60%] items-center">
                    <div>
                    <h4 className="text-lg text-gray-400">Passenger 1</h4>
                    <p className="text-gray-600 text-lg mt-4">First Last</p>
                    </div>
                    <div className="text-right">
                    <h4 className="text-lg text-gray-400 mb-2">Checked bags</h4>
                    <div className="flex items-center mt-4 space-x-3">
                        <button
                        onClick={decrementBags}
                        className="w-8 h-8 rounded bg-gray-100 border text-xl text-[var(--color-purple-blue] hover:bg-gray-100"
                        >
                        -
                        </button>
                        <span className="text-sm">{bags}</span>
                        <button
                        onClick={incrementBags}
                        className="w-8 h-8 rounded bg-gray-100 text-[var(--color-purple-blue] border text-xl hover:bg-gray-100"
                        >
                        +
                        </button>
                    </div>
                    </div>
                </div>

                {/* Buttons Row */}
                <div className="flex space-x-4 mt-[75px]">
                    <button className="px-4 py-2 border border-[var(--color-purple-blue] text-[var(--color-purple-blue] rounded hover:bg-[var(--color-purple-blue)] hover:text-white">
                    Save and close
                    </button>
                    <button className="px-4 py-2 border-gray-400 bg-[#605DEC] text-gray-100 rounded " disabled>
                    Select seats
                    </button>
                </div>
                </div>
        </form>
    </div>
  )
}

export default PassengerForm