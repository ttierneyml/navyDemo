export const sparqlQuery = (id, name, entity) => { 
  const configQuery = {
    weapon: weaponQuery(id, name),
    weaponPart: weaponPartQuery(id, name)
  }
  return configQuery[entity]
}

const weaponPartQuery = (id, name) => {
  return `
    SELECT ("${name}" AS ?s) ("Assigned To" as ?p) (STRAFTER(STR(?object), "weapon/") AS ?o) 
    WHERE {
      <http://example.org/weaponPart-1.0.0/weaponPart/${name}/${id}>
      <http://example.org/ontology#assignedToWeapon> 
      ?object
    }
  `
}

const weaponQuery = (id, name) => {
  return `
    SELECT ("${name}" AS ?s) ("Has Part" as ?p) (STRAFTER(STR(?subject), "weaponPart/") AS ?o)
    WHERE {
      ?subject
      <http://example.org/ontology#assignedToWeapon> 
      <http://example.org/weapon-1.0.0/weapon/${name}/${id}>
    }
  `
}

export const sparqlToItems = (sparqlResponse, name) => {
  if (!sparqlResponse) return;
  let items = {};
  sparqlResponse.results.bindings.forEach(r => {
    const { s, p, o } = r
    // create subject node
    if (s && s?.value) {
      items[s.value] = {
        label: [{ text: name }],
        color: "#FFA500"
      }
    }
    // create object node
    if (o && o?.value) {
        items[o.value] = {
          label: [{ text: decodeURIComponent(o?.value) }],
          color: "#87CEEB"
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