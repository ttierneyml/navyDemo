var contentArray;  // This will be populated with documents to process
var options;

contentArray.forEach(content => {
    const contentValue = content.value.toObject();
    const action = contentValue.envelope.instance.Action.split(/\s*,\s*/);

    // add list to the document
    contentValue.envelope.instance.Action = action;
    content.value = xdmp.toJSON(contentValue);
});
