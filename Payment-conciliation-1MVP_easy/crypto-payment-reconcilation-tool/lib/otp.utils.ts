
'use server'

import OTPgenerator from 'otp-generator' ;

export function TriggerCreateOTP() {
    return OTPgenerator.generate(6, { lowerCaseAlphabets: true ,specialChars: true , digits:true });
}
