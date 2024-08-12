const TimelineConfig = {
  entityTypeConfig: {
    "path": "extracted.*~" // child key of extracted
  },
  entities: [
    {
        entityType: 'person',
        entityTypeLabel: 'Persons',
        path: 'extracted.person',
        label: 'nameGroup.fullname.value',
        eventPath: '$',
        items: [
            {
                label: 'dob',
                timePath: 'dob'
            },            
        ],
        detailConfig: [
            {
                label: 'Person Id',
                path: 'personId'
            },
            {
                label: 'Date of Birth',
                path: 'dob'
            },
            {
                label: 'phone',
                path: 'phone'
            },
            {
                label: 'Salary',
                path: 'salary'
            },
            {
                label: 'Status',
                path: 'status'
            }
        ]
    },
    {
        entityType: 'organization',
        path: 'extracted.organization',
        label: 'names.name.value',
        eventPath: '$',
        items: [
            {
                label: 'founded',
                timePath: 'founded'
            }
        ],
        detailConfig: [
            {
                label: 'Organization Id',
                path: 'organizationId'
            },
            {
                label: 'Foundation Date',
                path: 'founded'
            },
            {
                label: 'Revenue',
                path: 'revenue'
            }
        ]
    }
  ]
}

export const ActivityConfig = {
    entityTypeConfig: {
      "path": "data.*~" // child key of extracted
    },
    entities: [
      {
          entityType: 'person',
          path: 'data.person',
          label: 'nameGroup.fullname.value',
          eventPath: 'activities.activity',
          items: [
              {
                  label: 'predicate',
                  timePath: 'ts'
              },            
          ]
      }
    ]
}

export const TimelineSettings = {
    // entityTypes: {
    //     default: {
    //         labelColor: 'black'
    //     },
    //     person: {
    //         labelColor: '#21deb8'
    //     },
    //     organization: {
    //         labelColor: '#D4886A'
    //     }
    // },
    eventTypes: {
        default: {
            showArrows: false,
        },
        "2015-11-01": {
            color: 'fuchsia'
        },
        "1976-04-13": {
            color: 'green'
        }
    }
}

export default TimelineConfig
