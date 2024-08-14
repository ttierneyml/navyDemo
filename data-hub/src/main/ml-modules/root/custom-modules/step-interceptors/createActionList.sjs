var contentArray;  // This will be populated with documents to process
var options;

contentArray.forEach(content => {
    const contentValue = content.value.toObject();
    const instance = contentValue.envelope.instance;
    const action = instance.action.split(/\s*,\s*/);

    // Create IRIs for the weapon part and weapon
  const weaponIri = sem.iri("http://example.org/weapon-1.0.0/weapon/" + fn.encodeForUri(instance.name) + "/" + fn.encodeForUri(instance.id));
  const typeIri = sem.iri('http://example.org/weaponType/' + fn.encodeForUri(instance.type));

  // Initialize triples array
  let triples = [
    sem.triple(
      weaponIri,
      sem.iri("http://example.org/ontology#weaponType"),
      typeIri
    ),
    sem.triple(
      typeIri,
      sem.iri("http://example.org/ontology#includes"),
      weaponIri
    )
  ];

    // add list to the document
    contentValue.envelope.triples = triples;
    contentValue.envelope.instance.action = action;
    content.value = xdmp.toJSON(contentValue);
});
