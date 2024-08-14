export const sparqlQuery = (id, name, entity) => {
  return `
    SELECT ("http://example.org/${entity}-1.0.0/${entity}/${name}/${id}" AS ?s) (STRAFTER(STR(?predicate), "ontology#") as ?p) (?object AS ?o) 
    WHERE {
      <http://example.org/${entity}-1.0.0/${entity}/${name}/${id}>
      ?predicate
      ?object
    }
  `
}

export const subjectQuery = (subject) => {
  return `
    SELECT ("${subject}" AS ?s) (STRAFTER(STR(?predicate), "ontology#") as ?p) (?object AS ?o) 
    WHERE {
      <${subject}>
      ?predicate
      ?object
    }
  `
}

export const sparqlToItems = (sparqlResponse, name) => {
  if (!sparqlResponse) return;
  let items = {};
  const subColor = "#FFA500"
  const objColor = "#87CEEB"

  sparqlResponse.forEach(r => {
    const { s, p, o } = r
    // create subject node
    if (s && s?.value) {
      const sub = decodeURIComponent(s?.value)
      var color = ""
      if(sub.split('/').slice(-2).join('/') == name){color = subColor}
      else{color = objColor}
      items[s.value] = {
        label: [{ text: sub.split('/').slice(-2).join('/') }],
        color: color
      }
    }
    // create object node
    if (o && o?.value) {
      const obj = decodeURIComponent(o?.value)
      var color = ""
      if(obj.split('/').slice(-2).join('/') == name){
        color = subColor}
      else{color = objColor}
      items[o.value] = {
        label: [{ text: obj.split('/').slice(-2).join('/') }],
        color: color
      }
    }
    // create predicate link
    if (s && s?.value && o && o?.value) {
      items[s.value + '-' + o.value] = {
        id1: s.value,
        id2: o.value,
        label: { text: p?.value },
      }
    }
  })
  return items //docToItems(items, docs);
}

const docToItems = (items, docs) => {
  if (!docs) return items;
  docs.forEach(doc => {
    if(doc?.instance?.ProviderTaxEntity?.TaxId){
      const str = "Tax ID: "
      const s = str.concat(doc.instance.ProviderTaxEntity.TaxId)
      const p = "containsLegalName"
      const o = doc.instance.ProviderTaxEntity.LegalName
      for (let i = 0; i < o.length; i++){
        // console.log(s)
        // create subject node
        if (s) {
          items[s] = {
            label: [{ text: s }],
            color: "#009ACD"
          }
        }
        // create object node
        if (o[i]) {
            items[o[i]] = {
              label: [{ text: o[i] }],
              color: "#009ACD"
            }
        }
        // create predicate link
        if (s && o[i]) {
          items[s + '-' + o[i]] = {
            id1: s,
            id2: o[i],
            label: { text: p },
          }
        }
      }
    }
  })
  return items;
}