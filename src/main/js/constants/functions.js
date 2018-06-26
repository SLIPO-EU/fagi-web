const Functions = [

  {
    name:"isDateKnownFormat",
    label:"Date is known format",
    parameterCount:1
  },
  {
    name:"isDatePrimaryFormat",
    label:"Date is primary format",
    parameterCount:1
  },
  {
    name:"isValidDate",
    label:"Date is valid format",
    parameterCount:1
  },
  {
    name:"isGeometryMoreComplex",
    label:"Geometry is more complex",
    parameterCount:1
  },
  {
    name:"isLiteralAbbreviation",
    label:"Literal contains abbreviation",
    parameterCount:1
  },
  {
    name:"isSameSimpleNormalize",
    label:"Is same using simple normalization",
    parameterCount:3
  },
  {
    name:"isSameCustomNormalize",
    label:"Is same using custom normalization",
    parameterCount:3
  },
  {
    name:"isPhoneNumberParsable",
    label:"Phone number is parsable",
    parameterCount:1
  },
  {
    name:"isSamePhoneNumber",
    label:"Phone number is same",
    parameterCount:2
  }, 
  {
    name:"isSamePhoneNumberCustomNormalize",
    label:"Phone number is same using normalization",
    parameterCount:2
  },
  {
    name:"isSamePhoneNumberUsingExitCode",
    label:"Phone number is same using exit code",
    parameterCount:3
  }, 
  {
    name:"exists",
    label:"Property exists",
    parameterCount:1
  }, 
  {
    name:"notExists",
    label:"Property does not exist",
    parameterCount:1
  }
];

module.exports = Functions;