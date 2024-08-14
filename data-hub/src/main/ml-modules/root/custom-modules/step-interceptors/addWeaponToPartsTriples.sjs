var contentArray;  // This will be populated with documents to process
var options;

contentArray.forEach(content => {
  const contentValue = content.value.toObject();
  const instance = contentValue.envelope.instance;
  const weaponId = instance.assignedTo;

  // Create IRIs for the weapon part and weapon
  const partIri = sem.iri("http://example.org/weaponPart-1.0.0/weaponPart/" + fn.encodeForUri(instance.name) + "/" + fn.encodeForUri(instance.id));
  const weaponIri = sem.iri("http://example.org/weapon-1.0.0/weapon/" + fn.encodeForUri(instance.model) + "/" + fn.encodeForUri(weaponId));

  // Initialize triples array
  let triples = [
    sem.triple(
      partIri,
      sem.iri("http://example.org/ontology#assignedToWeapon"),
      weaponIri
    ),
    sem.triple(
      weaponIri,
      sem.iri("http://example.org/ontology#hasPart"),
      partIri
    )
  ];

  // Add the triples to the document
  contentValue.envelope.triples = triples;
  content.value = xdmp.toJSON(contentValue);
});