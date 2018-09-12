const Statistics = 
  [
    {
      key: 'totalPois',
      disabled: true,
      name: "Total POIs",
      description: "Number of POI entities in each input dataset."
    },
    {
      key: 'totalTriples',
      name: "Total Triples",
      description: "Total number of triples in each input dataset."
    },
    {
      key: 'nonEmptyNames',
      name: "Total number of name properties.",
      description: "Total number of POIs that have the name property in each input dataset."
    },
    {
      key: 'nonEmptyPhones',
      name: "Total number of phone properties.",
      description: "Total number of POIs that have the phone property in each input dataset."
    },
    {
      key: 'nonEmptyStreets',
      name: "Total number of address street properties.",
      description: "Total number of POIs that have the address street property in each input dataset."
    },
    {
      key: 'nonEmptyStreetNumbers',
      name: "Total number of address street number properties.",
      description: "Total number of POIs that have the address street number property in each input dataset."
    },
    {
      key: 'nonEmptyWebsites',
      name: "Total number of website properties.",
      description: "Total number of POIs that have the website property in each input dataset."
    },
    {
      key: 'nonEmptyEmails',
      name: "Total number of email properties.",
      description: "Total number of POIs that have the email property in each input dataset."
    },
    {
      key: 'nonEmptyDates',
      name: "Total number of date properties.",
      description: "Total number of POIs that have the date property in each input dataset."
    },
    {
      key: 'emptyNames',
      name: "Total number of empty name properties.",
      description: "Total number of POIs that don' t have the name property in each input dataset."
    },
    {
      key: 'emptyPhones',
      name: "Total number of empty phone properties.",
      description: "Total number of POIs that don' t have the phone property in each input dataset."
    },
    {
      key: 'emptyStreets',
      name: "Total number of empty address street properties.",
      description: "Total number of POIs that don' t have the address street property in each input dataset."
    },
    {
      key: 'emptyStreetNumbers',
      name: "Total number of empty address street number properties.",
      description: "Total number of POIs that don' t have the address street number property in each input dataset."
    },
    {
      key: 'emptyWebsites',
      name: "Total number of empty website properties.",
      description: "Total number of POIs that don' t have the website property in each input dataset."
    },
    {
      key: 'emptyEmails',
      name: "Total number of empty email properties.",
      description: "Total number of POIs that don' t have the email property in each input dataset."
    },
    {
      key: 'emptyDates',
      name: "Total number of empty date properties.",
      description: "Total number of POIs that don' t have the date property in each input dataset."
    },
    {
      key: 'distinctProperties',
      name: "Distinct Properties.",
      description: "Number of distinct properties in each input dataset."
    },
    {
      key: 'primaryDatesFormatPercent',
      name: "Percentage of primary date formats.",
      description: "Percentage of primary date formats in each input dataset."
    },     
    {
      key: 'namesPercent',
      name: "Percentage of names.",
      description: "Percentage of name property in each input dataset."
    },
    {
      key: 'websitesPercent',
      name: "Percentage of websites.",
      description: "Percentage of website property in each input dataset."
    },
    {
      key: 'emailsPercent',
      name: "Percentage of e-mails.",
      description: "Percentage of e-mail property in each input dataset."
    },
    {
      key: 'phonesPercent',
      name: "Percentage of phones.",
      description: "Percentage of phone property in each input dataset."
    },
    {
      key: 'streetsPercent',
      name: "Percentage of streets.",
      description: "Percentage of street property in each input dataset."
    },
    {
      key: 'streetNumbersPercent',
      name: "Percentage of street numbers.",
      description: "Percentage of street number property in each input dataset."
    },
    {
      key: 'localityPercent',
      name: "Percentage of locality property.",
      description: "Percentage of locality property in each input dataset."
    },
    {
      key: 'datesPercent',
      name: "Percentage of dates.",
      description: "Percentage of date property in each input dataset."
    },
    {
      key: 'linkedPois',
      name: "Linked POIs.",
      description: "Number of linked POIs in each input dataset."
    },
    {
      key: 'linkedVsTotal',
      name: "Linked vs total POIs.",
      description: "Number of linked vs total POIs in the datasets."
    },
    {
      key: 'linkedTriples',
      name: "Linked Triples.",
      description: "Number of linked triples from each dataset (Triples associated with a linked POI)."
    },
    {
      key: 'linkedNonEmptyNames',
      name: "Linked non empty names.",
      description: "Number of linked POIs that have the name property in each input dataset."
    },
    {
      key: 'linkedNonEmptyPhones',
      name: "Linked non empty phones.",
      description: "Number of linked POIs that have the phone property in each input dataset."
    },
    {
      key: 'linkedNonEmptyStreets',
      name: "Linked non empty streets.",
      description: "Number of linked POIs that have the street property in each input dataset."
    },
    {
      key: 'linkedNonEmptyStreetNumbers',
      name: "Linked non empty street numbers.",
      description: "Number of linked POIs that have the street number property in each input dataset."
    },
    {
      key: 'linkedNonEmptyWebsites',
      name: "Linked non empty websites.",
      description: "Number of linked POIs that have the website property in each input dataset."
    },
    {
      key: 'linkedNonEmptyEmails',
      name: "Linked non empty e-mails.",
      description: "Number of linked POIs that have the e-mail property in each input dataset."
    },
    {
      key: 'linkedNonEmptyDates',
      name: "Linked non empty dates.",
      description: "Number of linked POIs that have the date property in each input dataset."
    },
    {
      key: 'linkedEmptyNames',
      name: "Linked empty names.",
      description: "Number of linked POIs that don' t have the name property in each input dataset."
    },
    {
      key: 'linkedEmptyPhones',
      name: "Linked empty phones.",
      description: "Number of linked POIs that don' t have the phone property in each input dataset."
    },
    {
      key: 'linkedEmptyStreets',
      name: "Linked empty streets.",
      description: "Number of linked POIs that don' t have the street property in each input dataset."
    },
    {
      key: 'linkedEmptyStreetNumbers',
      name: "Linked empty street numbers.",
      description: "Number of linked POIs that don' t have the street number property in each input dataset."
    },
    {
      key: 'linkedEmptyWebsites',
      name: "Linked empty websites.",
      description: "Number of linked POIs that don' t have the website property in each input dataset."
    },
    {
      key: 'linkedEmptyEmails',
      name: "Linked empty e-mails.",
      description: "Number of linked POIs that don' t have the e-mail property in each input dataset."
    },
    {
      key: 'linkedEmptyDates',
      name: "Linked empty dates.",
      description: "Number of linked POIs that don' t have the date property in each input dataset."
    },
    {
      key: 'totalNonEmptyProperties',
      name: "Total non empty properties.",
      description: "Total number of non empty properties in each input dataset."
    },
    {
      key: 'totalEmptyProperties',
      name: "Total empty properties.",
      description: "Total number of empty properties in each input dataset."
    },
    {
      key: 'totalPropertiesPercentage',
      name: "Total properties percentage.",
      description: "Percentage of total properties in each input dataset."
    },
    {
      key: 'averagePropertiesPerPoi',
      name: "Average properties per POI.",
      description: "Average properties per POI in each dataset."
    },
    {
      key: 'averageEmptyPropertiesPerPoi',
      name: "Average empty properties per POI.",
      description: "Average empty properties per POI in each dataset."
    },
    {
      key: 'averageLinkedProperties',
      name: "Average linked properties.",
      description: "Average number of properties of linked POIs."
    },
    {
      key: 'averageLinkedEmptyProperties',
      name: "Average linked empty properties.",
      description: "Average number of empty properties of linked POIs."
    },
    {
      key: 'namesLonger',
      name: "Longer name values.",
      description: "Number of name values from dataset A that are longer than the names of the corresponding POIs from dataset B."
    },
    {
      key: 'phonesLonger',
      name: "Longer phone values.",
      description: "Number of phone values from dataset A that are longer than the phones of the corresponding POIs from dataset B."
    },
    {
      key: 'fullMatchingStreets',
      name: "Full matching streets.",
      description: "Number of fully matching address streets between linked POIs in the two datasets."
    },
    {
      key: 'fullMatchingStreetNumbers',
      name: "Full matching street numbers.",
      description: "Number of fully matching address street numbers between linked POIs in the two datasets."
    },
//all keys that refer to fused statistic should start with "fused", in order the disabled checkboxes to work.
    {
      key: 'fusedVsLinked',
      name: "Fused POIs vs initial links.",
      description: "The number of POI links that were not rejected by FAGI and were actually considered for fusion of their attributes."
    },
    {
      key: 'fusedRejected',
      name: "Number of rejected POI links vs. initial links.",
      description: "The number of POI links that were eventually rejected by FAGI vs the initial links."
    },
    {
      key: 'fusedInitial',
      name: "Number of initial POIs vs number of POIs in fused.",
      description: "The number of POIs of each input dataset and the total POIs in the fused dataset."
    }
  ];

module.exports = Statistics;