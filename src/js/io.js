export default async (filename) => {
    const vertices = [];
    const buffer = [];
    (await (await fetch(filename)).text()).split('\n').map(it => it.trim()).filter(it => it.length > 0).forEach(line => {
        const parts = line.split(' ').splice(1);
        if (line.startsWith('v ')) {
            vertices.push({ x: parseFloat(parts[0]), y: parseFloat(parts[1]), z: parseFloat(parts[2]) });
        } else if (line.startsWith('f ')) {
            const v0 = vertices[parts[0] - 1];
            const v1 = vertices[parts[1] - 1];
            const v2 = vertices[parts[2] - 1];
            buffer.push(v0.x, v0.y, v0.z, 1, 0, 0, v1.x, v1.y, v1.z, 0, 1, 0, v2.x, v2.y, v2.z, 0, 0, 1);
        }
    });
    return buffer;
};
