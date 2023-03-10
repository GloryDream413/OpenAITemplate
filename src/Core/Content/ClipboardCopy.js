import {Slice, Fragment, Node} from 'prosemirror-model'

function clipboardTextParser(text, context, plain)
{
    const blocks = text
    const nodes = [];

    blocks.forEach(line => {
        let nodeJson = {type: "paragraph"};
        if (line.length > 0) {
            nodeJson.content = [{type: "text", text: line}]
        }
        let node = Node.fromJSON(context.doc.type.schema, nodeJson);
        nodes.push(node);
    });

    const fragment = Fragment.fromArray(nodes);
    return Slice.maxOpen(fragment);
}

export default clipboardTextParser