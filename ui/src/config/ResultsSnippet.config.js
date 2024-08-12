export const ResultsSnippetConfig = {
    entityTypeConfig: {
        path: 'extracted.*~' // child key of extracted
    },
    entities: [
        {
            entityType: 'person',
            title: {
                path: 'extracted.person.nameGroup.fullname.value'
            }
        }
    ]
}

export default ResultsSnippetConfig;