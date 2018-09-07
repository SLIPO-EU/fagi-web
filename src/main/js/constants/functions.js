const Functions = [


//type 1: selection[left,right],  selection property
//type 2: selection[left,right],  selection property,     input field
//type 3: selection property A,   selection property B
//type 4: selection property A,   selection property B,   threshold

//property
  {
    name:"exists",
    label:"Property exists",
    type:1,
    parameterCount:1
  }, 
  {
    name:"notExists",
    label:"Property does not exist",
    type:1,
    parameterCount:1
  },
//literal
  {
    name:"isSameCustomNormalize",
    label:"Is same using custom normalization",
    type:4,
    parameterCount:3
  },
  {
    name:"isLiteralAbbreviation",
    label:"Literal contains abbreviation",
    type:1,
    parameterCount:1
  },
  {
    name:"isSameSimpleNormalize",
    label:"Is same using simple normalization",
    type:4,
    parameterCount:3
  },
  {
    name:"isLiteralNumeric",
    label:"Is literal numeric",
    type:1,
    parameterCount:1
  },
  {
    name:"literalContains",
    label:"Literal contains",
    type:2,
    parameterCount:3
  },
  {
    name:"literalContainsTheOther",
    label:"Literal contains the other",
    type:1,
    parameterCount:1
  },
  {
    name:"literalHasLanguageAnnotation",
    label:"Literal has language annotation",
    type:1,
    parameterCount:1
  },
//geometry
  {
    name:"isGeometryMoreComplex",
    label:"Geometry is more complex",
    type:1,
    parameterCount:1
  },
  {
    name:"issamecentroid",
    label:"Geometries have same centroid",
    type:4,
    parameterCount:3
  },
  {
    name:"ispointgeometry",
    label:"Is POINT geometry",
    type:1,
    parameterCount:1
  },
  {
    name:"geometriesIntersect",
    label:"Geometries intersect",
    parameterCount:2
  },
  {
    name:"geometriesCloserThan",
    label:"Geometries are closer than",
    parameterCount:2
  },
  {
    name:"isGeometryCoveredBy",
    label:"Geometry is covered by",
    parameterCount:2
  },
  {
    name:"geometriesHaveSameArea",
    label:"Geometries have same area",
    type:4,
    parameterCount:3
  },
//phone
  {
    name:"isSamePhoneNumberCustomNormalize",
    label:"Phone number is same using normalization",
    type:4,
    parameterCount:2
  },
  {
    name:"isPhoneNumberParsable",
    label:"Phone number is parsable",
    type:1,
    parameterCount:1
  },
  {
    name:"isSamePhoneNumber",
    label:"Phone number is same",
    type:3,
    parameterCount:2
  }, 
  {
    name:"isSamePhoneNumberUsingExitCode",
    label:"Phone number is same using exit code",
    parameterCount:3
  },
  {
    name:"phoneHasMoreDigits",
    label:"Phone has more digits",
    parameterCount:2
  },
//date
  {
    name:"isDateKnownFormat",
    label:"Date is known format",
    type:1,
    parameterCount:1
  },
  {
    name:"isDatePrimaryFormat",
    label:"Date is primary format",
    type:1,
    parameterCount:1
  },
  {
    name:"isValidDate",
    label:"Date is valid format",
    type:1,
    parameterCount:1
  },
  {
    name:"datesAreSame",
    label:"Dates are the same",
    parameterCount:5
  }
];

module.exports = Functions;