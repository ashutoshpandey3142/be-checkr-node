import {expect} from 'chai'

it('should add number correctly', ()=> {
    const num1 = 2
    const num2 = 3

    expect(num1 + num2).to.equal(5)
    
})

it('should not give result of 6', ()=> {
    const num1 = 2
    const num2 = 3

    expect(num1 + num2).not.to.equal(6)
    
})