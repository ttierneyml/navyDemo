export function buildQueryForGraph(qtext){
    const wordQueries = []
    qtext.forEach((id) => {
        let q = {
            "range-query": {
                "type": "xs:string",
                "collation": "http://marklogic.com/collation/codepoint",
                "path-index": {
                    "text": "/(es:envelope|envelope)/(es:instance|instance)/ProviderTaxEntity/TaxId",
                    "namespaces": {
                        "es": "http://marklogic.com/entity-services"
                    }
                },
                "value": id
            }
        }
        wordQueries.push(q)
    })
    let cq = {
        "qtext": "",
        "query": {
            "queries": [
                {
                    "collection-query": {
                        "uri": ["sm-ProviderTaxEntity-mastered"]
                    }
                },
                {
                    "or-query": {
                        "queries": [wordQueries]
                    }
                }
            ]
        }}
    return cq
}
