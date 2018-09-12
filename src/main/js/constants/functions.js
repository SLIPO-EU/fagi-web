const Functions = [

//type 1: selection[left,right],  selection property
//type 2: selection[left,right],  selection property,     input field
//type 3: selection property A,   selection property B
//type 4: selection property A,   selection property B,   threshold ([0,1])
//type 5: selection property A,   selection property B,   tolerance(meters)
//type 6: selection property A,   selection property B,   input text
//type 7: selection[left,right],   format
//type 8: selection property A,   selection property B,   input text A, imput text B

//property
  {
    name:"exists",
    label:"Property exists",
    type:1
  }, 
  {
    name:"notExists",
    label:"Property does not exist",
    type:1
  },
//literal
  {
    name:"isSameCustomNormalize",
    label:"Is same using custom normalization",
    type:4
  },
  {
    name:"isLiteralAbbreviation",
    label:"Literal contains abbreviation",
    type:1
  },
  {
    name:"isSameSimpleNormalize",
    label:"Is same using simple normalization",
    type:4
  },
  {
    name:"isLiteralNumeric",
    label:"Is literal numeric",
    type:1
  },
  {
    name:"literalContains",
    label:"Literal contains",
    type:2
  },
  {
    name:"literalContainsTheOther",
    label:"Literal contains the other",
    type:1
  },
  {
    name:"literalHasLanguageAnnotation",
    label:"Literal has language annotation",
    type:1
  },
//geometry
  {
    name:"isGeometryMoreComplex",
    label:"Geometry is more complex",
    type:1
  },
  {
    name:"isSameCentroid",
    label:"Geometries have same centroid",
    type:5
  },
  {
    name:"isPointGeometry",
    label:"Is POINT geometry",
    type:1
  },
  {
    name:"geometriesIntersect",
    label:"Geometries intersect",
    type:3
  },
  {
    name:"geometriesCloserThan",
    label:"Geometries are closer than",
    type:5
  },
  {
    name:"isGeometryCoveredBy",
    label:"Geometry is covered by the other",
    type:1
  },
  {
    name:"geometriesHaveSameArea",
    label:"Geometries have same area",
    type:5
  },
//phone
  {
    name:"isSamePhoneNumberCustomNormalize",
    label:"Phone number is same using normalization",
    type:3
  },
  {
    name:"isPhoneNumberParsable",
    label:"Phone number is parsable",
    type:1
  },
  {
    name:"isSamePhoneNumber",
    label:"Phone number is same",
    type:3
  },
  {
    name:"isSamePhoneNumberUsingExitCode",
    label:"Phone number is same using exit code",
    type:6
  },
  {
    name:"phoneHasMoreDigits",
    label:"Phone has more digits than the other",
    type:1
  },
//date
  {
    name:"isDateKnownFormat",
    label:"Date is known format",
    type:1
  },
  {
    name:"isDatePrimaryFormat",
    label:"Date is primary format",
    type:1
  },
  {
    name:"isValidDate",
    label:"Date is valid format",
    type:7
  },
  {
    name:"datesAreSame",
    label:"Dates are the same",
    type:8
  }
];

module.exports = Functions;