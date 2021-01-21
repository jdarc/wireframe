export default class Matrix4 {

    static concatenate(lhs, rhs, dst = new Float32Array(16)) {
        const [aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap] = lhs;
        const [ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl, bm, bn, bo, bp] = rhs;
        dst[0x0] = aa * ba + ae * bb + ai * bc + am * bd;
        dst[0x1] = ab * ba + af * bb + aj * bc + an * bd;
        dst[0x2] = ac * ba + ag * bb + ak * bc + ao * bd;
        dst[0x3] = ad * ba + ah * bb + al * bc + ap * bd;
        dst[0x4] = aa * be + ae * bf + ai * bg + am * bh;
        dst[0x5] = ab * be + af * bf + aj * bg + an * bh;
        dst[0x6] = ac * be + ag * bf + ak * bg + ao * bh;
        dst[0x7] = ad * be + ah * bf + al * bg + ap * bh;
        dst[0x8] = aa * bi + ae * bj + ai * bk + am * bl;
        dst[0x9] = ab * bi + af * bj + aj * bk + an * bl;
        dst[0xA] = ac * bi + ag * bj + ak * bk + ao * bl;
        dst[0xB] = ad * bi + ah * bj + al * bk + ap * bl;
        dst[0xC] = aa * bm + ae * bn + ai * bo + am * bp;
        dst[0xD] = ab * bm + af * bn + aj * bo + an * bp;
        dst[0xE] = ac * bm + ag * bn + ak * bo + ao * bp;
        dst[0xF] = ad * bm + ah * bn + al * bo + ap * bp;
        return dst;
    }

    static createScale(x, y, z, dst = new Float32Array(16)) {
        dst.fill(0);
        dst[0] = x;
        dst[5] = y;
        dst[10] = z;
        dst[15] = 1;
        return dst;
    }

    static createRotationY(angle, dst = new Float32Array(16)) {
        dst.fill(0);
        dst[0] = dst[10] = Math.cos(angle);
        dst[8] = Math.sin(angle);
        dst[2] = -dst[8];
        dst[5] = dst[15] = 1;
        return dst;
    }

    static createLookAt(eye, center, up, dst = new Float32Array(16)) {
        const z0 = eye[0] - center[0];
        const z1 = eye[1] - center[1];
        const z2 = eye[2] - center[2];
        const lz = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        const x0 = up[1] * z2 - up[2] * z1;
        const x1 = up[2] * z0 - up[0] * z2;
        const x2 = up[0] * z1 - up[1] * z0;
        const lx = 1 / Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        const y0 = z1 * x2 - z2 * x1;
        const y1 = z2 * x0 - z0 * x2;
        const y2 = z0 * x1 - z1 * x0;
        const ly = 1 / Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        dst[0] = x0 * lx;
        dst[1] = y0 * ly;
        dst[2] = z0 * lz;
        dst[3] = 0;
        dst[4] = x1 * lx;
        dst[5] = y1 * ly;
        dst[6] = z1 * lz;
        dst[7] = 0;
        dst[8] = x2 * lx;
        dst[9] = y2 * ly;
        dst[10] = z2 * lz;
        dst[11] = 0;
        dst[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]) * lx;
        dst[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]) * ly;
        dst[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]) * lz;
        dst[15] = 1;
        return dst;
    }

    static createPerspectiveFov(fov, aspectRatio, nearPlane, farPlane, dst = new Float32Array(16)) {
        dst.fill(0);
        dst[5] = 1 / Math.tan(fov * Math.PI / 360);
        dst[0] = dst[5] / aspectRatio;
        dst[10] = -(farPlane + nearPlane) / (farPlane - nearPlane);
        dst[11] = -1;
        dst[14] = -(2 * farPlane * nearPlane) / (farPlane - nearPlane);
        return dst;
    }
}
