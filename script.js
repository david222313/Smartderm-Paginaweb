// ══════════════════════════════════════════════════════════════════
//  SmartDerm – script.js  v2.0
//  Correcciones: fix #1-#10 + Curso 11 Skincare Manchas
// ══════════════════════════════════════════════════════════════════

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

let currentUser   = null;
let userCourses   = {};
let currentPreviewCourse = null;
let currentEvalCourse    = null;

// ── CATÁLOGO BASE ─────────────────────────────────────────────────
const CURSOS_BASE = {
    1: {
        nombre: "Introducción a la dermatología clínica",
        img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
        descripcion: "Curso base que presenta la anatomía y fisiología de la piel, los principios del diagnóstico clínico y el tratamiento de las enfermedades dermatológicas más frecuentes en la práctica médica.",
        duracion: "8 horas", nivel: "Básico", instructor: "Dra. Ana Morales",
        videoId: "dQw4w9WgXcQ",
        temario: [
            "Módulo 1 – Anatomía y fisiología de la piel",
            "Módulo 2 – Semiología dermatológica básica",
            "Módulo 3 – Lesiones primarias y secundarias",
            "Módulo 4 – Enfermedades inflamatorias frecuentes",
            "Módulo 5 – Principios del tratamiento tópico",
            "Módulo 6 – Casos clínicos resueltos"
        ]
    },
    2: {
        nombre: "Diagnóstico de enfermedades cutáneas comunes",
        img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
        descripcion: "Formación enfocada en identificar lesiones y síntomas característicos de patologías frecuentes como acné, dermatitis, psoriasis y micosis superficiales, utilizando métodos clínicos y herramientas diagnósticas actualizadas.",
        duracion: "12 horas", nivel: "Intermedio", instructor: "Dr. Carlos Ruiz",
        videoId: "dQw4w9WgXcQ",
        temario: [
            "Módulo 1 – Clasificación de dermatosis inflamatorias",
            "Módulo 2 – Acné y dermatitis seborreica",
            "Módulo 3 – Psoriasis: diagnóstico y variantes",
            "Módulo 4 – Eczemas y dermatitis de contacto",
            "Módulo 5 – Infecciones bacterianas cutáneas",
            "Módulo 6 – Micosis superficiales y onicomicosis",
            "Módulo 7 – Uso del dermatoscopio en consulta"
        ]
    },
    3: {
        nombre: "Dermatología para atención primaria",
        img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
        descripcion: "Curso dirigido a médicos generales y personal de salud que necesitan reconocer, evaluar y manejar problemas dermatológicos básicos en la consulta diaria, con énfasis en criterios de derivación al especialista.",
        duracion: "10 horas", nivel: "Básico", instructor: "Dr. Luis Herrera",
        videoId: "dQw4w9WgXcQ",
        temario: [
            "Módulo 1 – Abordaje dermatológico en atención primaria",
            "Módulo 2 – Dermatosis de consulta frecuente",
            "Módulo 3 – Urgencias dermatológicas",
            "Módulo 4 – Criterios de derivación al especialista",
            "Módulo 5 – Prescripción de corticoides tópicos",
            "Módulo 6 – Prevención y fotodaño solar"
        ]
    },
    4: {
        nombre: "Dermatología pediátrica avanzada",
        img: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=80",
        descripcion: "Programa especializado en el diagnóstico y tratamiento de enfermedades cutáneas en niños, incluyendo afecciones congénitas, infecciosas, inflamatorias y genodermatosis propias de la etapa pediátrica.",
        duracion: "15 horas", nivel: "Avanzado", instructor: "Dra. Patricia Vega",
        videoId: "dQw4w9WgXcQ",
        temario: [
            "Módulo 1 – Particularidades de la piel pediátrica",
            "Módulo 2 – Dermatitis atópica en la infancia",
            "Módulo 3 – Exantemas infecciosos en niños",
            "Módulo 4 – Genodermatosis: diagnóstico y manejo",
            "Módulo 5 – Hemangiomas y malformaciones vasculares",
            "Módulo 6 – Acné neonatal e infantil",
            "Módulo 7 – Fotosensibilidad en pacientes pediátricos",
            "Módulo 8 – Casos clínicos complejos"
        ]
    },
    5: {
        nombre: "Protégete del Cáncer de Piel: Guía Práctica",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
        descripcion: "Aprende a identificar señales de alerta en tu piel, entender los factores de riesgo y adoptar hábitos diarios de protección solar para prevenir el cáncer de piel desde casa.",
        duracion: "3 horas", nivel: "Sin certificación · Público general",
        instructor: "Equipo SmartDerm", videoId: "dQw4w9WgXcQ", sinCertificacion: true,
        temario: [
            "Módulo 1 – ¿Qué es el cáncer de piel y por qué me debe importar?",
            "Módulo 2 – Los tipos de piel y su vulnerabilidad al sol",
            "Módulo 3 – La regla ABCDE: cómo revisar tus lunares en casa",
            "Módulo 4 – Factor solar (SPF): mitos, verdades y cómo elegirlo",
            "Módulo 5 – Hábitos de protección solar para toda la familia",
            "Módulo 6 – Cuándo visitar al dermatólogo: señales de alarma",
            "Módulo 7 – Alimentación y piel: lo que sí ayuda"
        ]
    },
    6: {
        nombre: "Maquillaje Seguro y Piel Saludable",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
        descripcion: "Descubre cómo elegir productos de maquillaje y cuidado facial que respeten tu tipo de piel, qué ingredientes evitar, cómo leer etiquetas de cosméticos y rutinas básicas que hacen la diferencia.",
        duracion: "2.5 horas", nivel: "Sin certificación · Público general",
        instructor: "Equipo SmartDerm", videoId: "dQw4w9WgXcQ", sinCertificacion: true,
        temario: [
            "Módulo 1 – Tipos de piel: conoce la tuya antes de maquillarte",
            "Módulo 2 – Ingredientes beneficiosos en cosméticos",
            "Módulo 3 – Ingredientes que debes evitar según tu tipo de piel",
            "Módulo 4 – Cómo leer una etiqueta de producto cosmético",
            "Módulo 5 – Rutina básica de cuidado: limpieza, hidratación y protección",
            "Módulo 6 – Maquillaje sin dañar la piel: bases, correctores y desmaquillantes",
            "Módulo 7 – Acné y maquillaje: cómo convivir sin empeorar"
        ]
    },
    7: {
        nombre: "Piel Sana en el Día a Día",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        descripcion: "Consejos prácticos respaldados por dermatólogos para mantener una piel sana con hábitos simples: hidratación, alimentación, sueño, estrés y factores ambientales.",
        duracion: "2 horas", nivel: "Sin certificación · Público general",
        instructor: "Equipo SmartDerm", videoId: "dQw4w9WgXcQ", sinCertificacion: true,
        temario: [
            "Módulo 1 – La piel como reflejo de tu salud general",
            "Módulo 2 – Hidratación interna y externa: cuánta agua necesita tu piel",
            "Módulo 3 – Alimentos que benefician y dañan la piel",
            "Módulo 4 – El estrés y su impacto en la piel",
            "Módulo 5 – Sueño y regeneración celular de la piel",
            "Módulo 6 – Contaminación ambiental y cuidado de la piel en ciudad",
            "Módulo 7 – Rutinas sencillas para todas las edades"
        ]
    },
    8: {
        nombre: "Acné: Entiéndelo y Trátalo Bien",
        img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
        descripcion: "Una guía honesta sobre el acné: por qué aparece, qué lo empeora, qué tratamientos caseros funcionan y cuáles son mitos, y cuándo realmente necesitas ver a un especialista.",
        duracion: "2 horas", nivel: "Sin certificación · Público general",
        instructor: "Equipo SmartDerm", videoId: "dQw4w9WgXcQ", sinCertificacion: true,
        temario: [
            "Módulo 1 – ¿Qué es el acné y por qué a mí?",
            "Módulo 2 – Tipos de acné: no todos son iguales",
            "Módulo 3 – Lo que empeora el acné sin que lo sepas",
            "Módulo 4 – Remedios caseros: cuáles funcionan y cuáles son mitos",
            "Módulo 5 – Ingredientes activos clave: retinol, ácido salicílico, niacinamida",
            "Módulo 6 – Dieta y acné: la conexión real",
            "Módulo 7 – Cuándo ir al dermatólogo y qué esperar"
        ]
    },
    9: {
        nombre: "Envejecimiento Saludable de la Piel",
        img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
        descripcion: "Comprende el proceso natural de envejecimiento de la piel y aprende qué hábitos, ingredientes y cuidados realmente hacen diferencia, sin exageraciones ni gastos innecesarios.",
        duracion: "2.5 horas", nivel: "Sin certificación · Público general",
        instructor: "Equipo SmartDerm", videoId: "dQw4w9WgXcQ", sinCertificacion: true,
        temario: [
            "Módulo 1 – Cómo envejece la piel: lo que es normal y lo que no",
            "Módulo 2 – El sol: principal causa del envejecimiento prematuro",
            "Módulo 3 – Ingredientes antiedad que sí funcionan",
            "Módulo 4 – Rutinas de cuidado por décadas: 20s, 30s, 40s y más",
            "Módulo 5 – Hidratación profunda: claves para una piel firme",
            "Módulo 6 – Lo que no necesitas: mitos y productos innecesarios",
            "Módulo 7 – Procedimientos mínimamente invasivos: cuándo y por qué"
        ]
    },
    10: {
        nombre: "Alergias e Irritaciones de la Piel",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
        descripcion: "Aprende a identificar, manejar y prevenir alergias cutáneas, dermatitis de contacto y reacciones a productos del hogar o cosméticos.",
        duracion: "2 horas", nivel: "Sin certificación · Público general",
        instructor: "Equipo SmartDerm", videoId: "dQw4w9WgXcQ", sinCertificacion: true,
        temario: [
            "Módulo 1 – Diferencia entre alergia e irritación de la piel",
            "Módulo 2 – Alérgenos comunes en el hogar y cosméticos",
            "Módulo 3 – Dermatitis de contacto: cómo identificarla",
            "Módulo 4 – Primeros auxilios para reacciones cutáneas",
            "Módulo 5 – Ingredientes cosméticos que provocan alergia frecuente",
            "Módulo 6 – Pruebas de parche en casa: paso a paso",
            "Módulo 7 – Cuándo es urgente ir al médico"
        ]
    },
    // ── NUEVO CURSO #11 (CON CERTIFICACIÓN) ──────────────────────
    11: {
        nombre: "Skincare para manchas: cómo entenderlas y tratarlas correctamente",
        img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
        descripcion: "Curso con certificación sobre hiperpigmentación y manchas cutáneas. Aprende la fisiología, los ingredientes activos con evidencia científica, los errores más comunes y cómo construir una rutina despigmentante efectiva y segura.",
        duracion: "3 horas", nivel: "Intermedio", instructor: "Equipo SmartDerm",
        videoId: "dQw4w9WgXcQ", sinCertificacion: false,
        temario: [
            "Clase 1 – Introducción: ¿Por qué aparecen las manchas en la piel?",
            "Clase 2 – Tipos de hiperpigmentación: melasma, manchas solares, PIH y más",
            "Clase 3 – El rol del sol en la formación y perpetuación de manchas",
            "Clase 4 – La melanina: cómo se produce y cómo regularla",
            "Clase 5 – Ingredientes despigmentantes: vitamina C, niacinamida y ácido kójico",
            "Clase 6 – Retinoides en el tratamiento de manchas: uso y precauciones",
            "Clase 7 – Ácidos exfoliantes (AHA/BHA): mecanismo y aplicación correcta",
            "Clase 8 – Protector solar: el pilar indispensable del tratamiento",
            "Clase 9 – Errores comunes que empeoran las manchas",
            "Clase 10 – Rutina AM y PM despigmentante: paso a paso",
            "Clase 11 – Manchas post-inflamatorias (PIH): acné, heridas y procedimientos",
            "Clase 12 – Melasma hormonal: particularidades y manejo",
            "Clase 13 – Tratamientos en consulta: peelings, láser e IPL",
            "Clase 14 – Skincare despigmentante en pieles oscuras: recomendaciones especiales",
            "Clase 15 – Seguimiento y mantenimiento: cómo mantener los resultados"
        ]
    }
};

// FIX #2: Fusionar cursos base con cursos personalizados del admin
function buildCursosInfo() {
    const custom = JSON.parse(localStorage.getItem('smartderm_custom_courses') || '{}');
    return Object.assign({}, CURSOS_BASE, custom);
}
let CURSOS_INFO = buildCursosInfo();

const EN_MIS_CURSOS = window.location.pathname.endsWith("mis-cursos.html");

// ── SESIÓN ────────────────────────────────────────────────────────
function loadUserData() {
    const stored = localStorage.getItem('smartderm_user');
    if (stored) {
        const data = JSON.parse(stored);
        currentUser = data.user;
        userCourses = data.courses || {};
    }
    ensureDefaultAdmin();
    CURSOS_INFO = buildCursosInfo();
}

function ensureDefaultAdmin() {
    const adminKey = 'user_admin@smartderm.com';
    if (!localStorage.getItem(adminKey)) {
        localStorage.setItem(adminKey, JSON.stringify({
            name: 'Administrador SmartDerm', email: 'admin@smartderm.com',
            password: btoa('Admin2025!'), role: 'admin', avatar: 'A',
            joined: new Date().toISOString(), courses: {}
        }));
    }
    const stored = JSON.parse(localStorage.getItem('smartderm_user') || '{}');
    const users = stored.users || [];
    if (!users.find(u => u.email === 'admin@smartderm.com')) {
        users.push({ id: 0, name: 'Administrador SmartDerm', email: 'admin@smartderm.com',
            password: btoa('Admin2025!'), role: 'admin', avatar: 'A', joined: new Date().toISOString() });
        stored.users = users;
        localStorage.setItem('smartderm_user', JSON.stringify(stored));
    }
}

function sanitizeInput(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
}

function saveUserData() {
    const stored = JSON.parse(localStorage.getItem('smartderm_user') || '{}');
    stored.user    = currentUser;
    stored.courses = userCourses;
    localStorage.setItem('smartderm_user', JSON.stringify(stored));
    // FIX #2: sincronizar cursos en clave individual del usuario
    if (currentUser) {
        const uData = JSON.parse(localStorage.getItem(`user_${currentUser.email}`) || '{}');
        uData.courses = userCourses;
        localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(uData));
    }
}

// ── AUTH ──────────────────────────────────────────────────────────
function showLogin() {
    document.getElementById("auth").style.display = "flex";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}
function toggleRegister() {
    const lf = document.getElementById("loginForm");
    const rf = document.getElementById("registerForm");
    const show = rf.style.display === "none";
    lf.style.display = show ? "none"  : "block";
    rf.style.display = show ? "block" : "none";
}

// FIX #7: longitud mínima de contraseña desde configuración
function getMinPasswordLength() {
    const cfg = JSON.parse(localStorage.getItem('smartderm_config') || '{}');
    return parseInt(cfg.sec_minPasswordLen) || 6;
}

// FIX #9: bloqueo por intentos fallidos
const _loginAttempts = {};
function _checkAttempts(email) {
    const e = _loginAttempts[email];
    if (!e) return true;
    if (e.count >= 5 && (Date.now() - e.ts) < 300000) {
        alert('Cuenta bloqueada temporalmente (5 intentos fallidos). Espera 5 minutos.');
        return false;
    }
    if ((Date.now() - e.ts) >= 300000) delete _loginAttempts[email];
    return true;
}
function _failAttempt(email) {
    if (!_loginAttempts[email]) _loginAttempts[email] = { count:0, ts:0 };
    _loginAttempts[email].count++;
    _loginAttempts[email].ts = Date.now();
}

function login() {
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if (!isValidEmail(email)) { alert("Por favor ingresa un email válido."); return; }
    if (!password)             { alert("Por favor ingresa tu contraseña.");  return; }
    if (!_checkAttempts(email)) return;

    const raw = localStorage.getItem(`user_${email}`);
    if (!raw) { alert("Usuario no registrado. Por favor regístrate primero."); return; }
    const ud = JSON.parse(raw);
    if (btoa(password) !== ud.password) {
        _failAttempt(email);
        alert("Contraseña incorrecta.");
        return;
    }
    delete _loginAttempts[email];
    currentUser = { email, role: ud.role, name: ud.name, password: ud.password, avatar: ud.avatar };
    userCourses = ud.courses || {};
    saveUserData();
    window.location.href = ud.role === 'admin' ? "admin.html" : "mis-cursos.html";
}

function loginWithGoogle() {
    const name  = "Usuario Google";
    const email = `google_${Date.now()}@gmail.com`;
    currentUser = { email, role: "estudiante", name };
    userCourses = {};
    localStorage.setItem(`user_${email}`, JSON.stringify({
        name, email, password: btoa('google_oauth'), role: 'estudiante',
        joined: new Date().toISOString(), courses: {}
    }));
    saveUserData();
    window.location.href = "mis-cursos.html";
}

function register() {
    const name   = document.getElementById("name").value.trim();
    const email  = document.getElementById("regEmail").value.trim();
    const pass   = document.getElementById("regPassword").value;
    const role   = document.getElementById("regRole").value;
    const minLen = getMinPasswordLength();

    if (!name)                { alert("Por favor ingresa tu nombre."); return; }
    if (!isValidEmail(email)) { alert("Por favor ingresa un email válido."); return; }
    if (pass.length < minLen) { alert(`La contraseña debe tener al menos ${minLen} caracteres.`); return; }
    if (localStorage.getItem(`user_${email}`)) { alert("Este email ya está registrado."); return; }

    localStorage.setItem(`user_${email}`, JSON.stringify({
        name, email, password: btoa(pass), role,
        avatar: name.charAt(0).toUpperCase(),
        joined: new Date().toISOString(), courses: {}
    }));
    const stored = JSON.parse(localStorage.getItem('smartderm_user') || '{}');
    const users  = stored.users || [];
    users.push({ id: Date.now(), name, email, password: btoa(pass), role, joined: new Date().toISOString() });
    stored.users = users;
    localStorage.setItem('smartderm_user', JSON.stringify(stored));

    alert("¡Usuario registrado correctamente! Ya puedes iniciar sesión.");
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display    = "block";
}

function logout() {
    currentUser = null;
    userCourses = {};
    const stored = JSON.parse(localStorage.getItem('smartderm_user') || '{}');
    delete stored.user;
    delete stored.courses;
    localStorage.setItem('smartderm_user', JSON.stringify(stored));
    window.location.href = "index.html";
}

// ── INSCRIPCIÓN ───────────────────────────────────────────────────
function enrollCourse(cursoId) {
    if (!currentUser) {
        alert("Debes iniciar sesión primero.");
        if (typeof showLogin === 'function') showLogin();
        return;
    }
    if (!userCourses[cursoId]) {
        userCourses[cursoId] = { progress: 0, completed: false };
        saveUserData();
        // FIX #6: redirigir o mostrar enlace claro
        const ir = confirm("¡Te has inscrito al curso! ¿Ir a Mis Cursos ahora?");
        if (ir) window.location.href = "mis-cursos.html";
    } else {
        alert("Ya estás inscrito en este curso.");
    }
}

// ── MODAL PREVIEW ─────────────────────────────────────────────────
function showCoursePreview(cursoId) {
    const curso = CURSOS_INFO[cursoId];
    if (!curso) return;
    currentPreviewCourse = cursoId;

    document.getElementById("preview-title").textContent       = curso.nombre;
    document.getElementById("preview-duracion").textContent    = curso.duracion;
    document.getElementById("preview-nivel").textContent       = curso.nivel;
    document.getElementById("preview-instructor").textContent  = curso.instructor;
    document.getElementById("preview-description").textContent = curso.descripcion;

    const vw = document.getElementById("preview-video-wrapper");
    vw.innerHTML = curso.videoId
        ? `<iframe src="https://www.youtube.com/embed/${curso.videoId}?rel=0&modestbranding=1"
              title="${curso.nombre}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<div class="video-placeholder"><div class="play-icon">▶</div><p>Video próximamente</p></div>`;

    document.getElementById("preview-temario").innerHTML = curso.temario.map((m,i) =>
        `<li><span class="modulo-num">${String(i+1).padStart(2,'0')}</span><span>${m}</span></li>`).join('');

    const progressEl = document.getElementById("preview-progress");
    if (progressEl) {
        const ins = userCourses[cursoId];
        progressEl.innerHTML = ins
            ? `<div style="margin:10px 0;"><p style="color:#00897b;font-weight:bold;margin-bottom:6px;">✅ Inscrito — Progreso: ${ins.progress}%</p><div class="progress-bar-container"><div class="progress-bar" style="width:${ins.progress}%">${ins.progress}%</div></div></div>`
            : '';
    }

    const btn = document.querySelector(".btn-inscribirse");
    if (btn) {
        if (userCourses[cursoId]) {
            btn.textContent = "Continuar en Mis Cursos";
            btn.onclick = () => { closePreviewModal(); window.location.href = "mis-cursos.html"; };
        } else {
            btn.textContent = "Inscribirme al Curso";
            btn.onclick = enrollFromPreview;
        }
    }

    document.getElementById("coursePreviewModal").style.display = "flex";

    const pac = document.getElementById("preview-assistant-container");
    if (pac && typeof initAssistant === 'function') {
        pac.innerHTML = '';
        initAssistant({ containerId: 'preview-assistant-container', courseContext: curso });
    }
}

function closePreviewModal() {
    const modal = document.getElementById("coursePreviewModal");
    if (!modal) return;
    const iframe = modal.querySelector("iframe");
    if (iframe) iframe.src = iframe.src;
    modal.style.display = "none";
}

function enrollFromPreview() {
    if (currentPreviewCourse) { enrollCourse(currentPreviewCourse); closePreviewModal(); }
}

// ── MIS CURSOS ────────────────────────────────────────────────────
// FIX #1: ocultar eval/cert para cursos sinCertificacion
function renderMisCursos() {
    const grid = document.getElementById("mis-cursos-grid");
    if (!grid) return;
    let html = '';
    for (let id in userCourses) {
        const curso     = CURSOS_INFO[id];
        if (!curso) continue;
        const prog      = userCourses[id].progress  || 0;
        const completed = userCourses[id].completed || false;
        const sinCert   = !!curso.sinCertificacion;

        const evalBtn = !sinCert
            ? `<button onclick="startEval(${id})" ${completed ? 'disabled' : ''} class="btn-eval-curso"
                   style="margin-top:6px;${completed?'opacity:.55;cursor:not-allowed;':''}">
                   ${completed ? '✅ Evaluación aprobada' : 'Realizar evaluación'}
               </button>`
            : `<p style="font-size:12px;color:#888;margin-top:8px;font-style:italic;">ℹ️ Curso libre – sin evaluación ni certificado</p>`;

        const certBtn = (!sinCert && completed)
            ? `<button onclick="showCertificate(${id})" style="margin-top:6px;" class="btn-cert-curso">🏆 Ver certificado</button>`
            : '';

        html += `<div class="curso-card" data-curso-id="${id}">
            <img src="${curso.img}" alt="${curso.nombre}" onerror="this.src='https://placehold.co/600x400/e0f2f1/00897b?text=SmartDerm';this.onerror=null;">
            <h3>${curso.nombre}</h3>
            <div class="progress-bar-container"><div class="progress-bar" style="width:${prog}%;">${prog}%</div></div>
            <button class="btn-ver-curso" onclick="showCoursePreview(${id})">Ver contenido</button>
            ${evalBtn}${certBtn}
        </div>`;
    }
    if (!html) {
        html = `<div style="text-align:center;padding:40px 20px;color:#777;">
            <p style="font-size:18px;margin-bottom:10px;">📚 Aún no tienes cursos inscritos</p>
            <p>Explora el catálogo y empieza tu formación en dermatología.</p>
            <a href="cursos-disponibles.html" style="display:inline-block;margin-top:16px;padding:10px 24px;background:#00b894;color:#fff;border-radius:8px;font-weight:bold;">Ver cursos disponibles</a>
        </div>`;
    }
    grid.innerHTML = html;
}

// ── EVALUACIÓN ────────────────────────────────────────────────────
function startEval(cursoId) {
    const inscripcion = userCourses[cursoId];
    if (!inscripcion) { alert("No estás inscrito en este curso."); return; }
    if (inscripcion.completed) { alert("Ya completaste y aprobaste este curso. ✅"); return; }
    const curso = CURSOS_INFO[cursoId];
    if (curso && curso.sinCertificacion) { alert("Este curso no requiere evaluación."); return; }

    currentEvalCourse = cursoId;
    let preguntas = EVAL_BANCO[cursoId];
    if (!preguntas || !preguntas.length) preguntas = _genPreguntas(cursoId);
    window._evalPreg = preguntas;

    const titleEl = document.getElementById("eval-title");
    if (titleEl) titleEl.textContent = "Evaluación: " + (curso ? curso.nombre : "Curso");

    const container = document.getElementById("eval-questions-container");
    if (container) {
        container.innerHTML = preguntas.map((p,i) => `
            <div style="background:#f8f8f8;border-radius:10px;padding:16px 20px;border-left:3px solid #00b894;">
                <p style="font-weight:600;color:#1a1a1a;margin-bottom:12px;">${i+1}. ${p.pregunta}</p>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${p.opciones.map((op,j) => `
                        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:8px 12px;border-radius:6px;border:1.5px solid #e0e0e0;background:white;">
                            <input type="radio" name="q${i}" value="${j}" style="accent-color:#00b894;">
                            <span style="font-size:14px;color:#333;">${op}</span>
                        </label>`).join('')}
                </div>
            </div>`).join('');
    }
    document.getElementById("evalModal").style.display = "flex";
}

// FIX #8: umbral 70% (configurable)
function getApprovalThreshold() {
    const cfg = JSON.parse(localStorage.getItem('smartderm_config') || '{}');
    return parseInt(cfg.sec_approvalPct) || 70;
}

function submitEval() {
    const preguntas = window._evalPreg;
    if (!preguntas || !currentEvalCourse) return;
    let correctas = 0, todas = true;
    preguntas.forEach((p,i) => {
        const sel = document.querySelector(`input[name="q${i}"]:checked`);
        if (!sel) { todas = false; }
        else if (parseInt(sel.value) === p.respuesta) correctas++;
    });
    if (!todas) { alert("Por favor responde todas las preguntas antes de enviar."); return; }
    const pct    = Math.round((correctas / preguntas.length) * 100);
    const umbral = getApprovalThreshold();
    if (pct < umbral) {
        alert(`Obtuviste ${correctas}/${preguntas.length} (${pct}%). Necesitas al menos ${umbral}% para aprobar. ¡Revisa e intenta de nuevo!`);
        return;
    }
    alert(`✅ ¡Evaluación aprobada! Obtuviste ${correctas}/${preguntas.length} (${pct}%). ¡Felicidades!`);
    userCourses[currentEvalCourse].progress  = 100;
    userCourses[currentEvalCourse].completed = true;
    saveUserData();
    closeModal();
    renderMisCursos();
    delete window._evalPreg;
}

function _genPreguntas(cursoId) {
    const curso = CURSOS_INFO[cursoId];
    if (!curso) return [];
    return curso.temario.slice(0,5).map((mod,i) => ({
        pregunta: `¿Cuál es el objetivo de "${mod.replace(/^(Módulo|Clase)\s*\d+\s*[–-]\s*/i,'')}"?`,
        opciones: [
            `Comprender y aplicar los conceptos del módulo`,
            `Omitir este módulo sin revisar el material`,
            `Buscar información en fuentes no validadas`,
            `Aplicar técnicas contraindicadas`
        ],
        respuesta: 0
    }));
}

function closeModal() {
    const m = document.getElementById("evalModal");
    if (m) m.style.display = "none";
}

// ── CERTIFICADO ───────────────────────────────────────────────────
function showCertificate(cursoId) {
    const curso = CURSOS_INFO[cursoId];
    if (curso && curso.sinCertificacion) { alert("Este curso no otorga certificado."); return; }
    document.getElementById("cert-curso-nombre").innerText = curso?.nombre || "Curso";
    document.getElementById("certModal").style.display = "flex";
}
function closeCertModal() { document.getElementById("certModal").style.display = "none"; }
function downloadCertificate() { alert("Descargando certificado... (simulado)"); }

// ── NAVBAR ────────────────────────────────────────────────────────
// FIX #10: función unificada para todas las páginas
function actualizarNavbarIndex() {
    const showcase = document.getElementById("btn-login");
    const navUser  = document.getElementById("nav-user-info");
    const btnNav   = document.getElementById("btn-login-nav");
    const userNav  = document.getElementById("nav-user-info-nav");
    if (currentUser) {
        if (showcase)  showcase.style.display = "none";
        if (navUser)  { navUser.style.display = "inline-flex"; const el=document.getElementById("nav-user-name"); if(el) el.textContent=currentUser.name||currentUser.email; }
        if (btnNav)    btnNav.style.display   = "none";
        if (userNav)  {
            userNav.style.display = "flex";
            const el = document.getElementById("nav-user-name-nav");
            if (el) el.textContent = currentUser.name || currentUser.email;
            const al = document.getElementById("nav-admin-link");
            if (al) al.style.display = currentUser.role === 'admin' ? 'list-item' : 'none';
        }
    } else {
        if (showcase)  showcase.style.display = "inline-block";
        if (navUser)   navUser.style.display  = "none";
        if (btnNav)    btnNav.style.display   = "list-item";
        if (userNav)   userNav.style.display  = "none";
    }
}

window.onload = function () {
    loadUserData();
    actualizarNavbarIndex();
    if (EN_MIS_CURSOS) {
        if (!currentUser) { window.location.href = "index.html"; return; }
        const el = document.getElementById("user-name");
        if (el) el.textContent = currentUser.name || currentUser.email;
        renderMisCursos();
    }
};

// ── BANCO DE PREGUNTAS ────────────────────────────────────────────
const EVAL_BANCO = {
    1: [
        { pregunta: "¿Cuál es la capa más externa de la piel?", opciones: ["Hipodermis","Epidermis","Dermis","Tejido subcutáneo"], respuesta: 1 },
        { pregunta: "¿Qué célula produce melanina?", opciones: ["Queratinocito","Fibroblasto","Melanocito","Macrófago"], respuesta: 2 },
        { pregunta: "¿Qué lesión primaria es elevada y contiene líquido claro?", opciones: ["Pápula","Vesícula","Mácula","Nódulo"], respuesta: 1 }
    ],
    2: [
        { pregunta: "¿Cuál de estas es una dermatosis inflamatoria crónica?", opciones: ["Impétigo","Psoriasis","Foliculitis","Celulitis"], respuesta: 1 },
        { pregunta: "¿Qué hongo causa la tiña pedis?", opciones: ["Candida albicans","Malassezia","Dermatophyton","Trichophyton"], respuesta: 3 },
        { pregunta: "El dermatoscopio se utiliza principalmente para:", opciones: ["Tomar biopsias","Examinar lesiones pigmentadas","Aplicar tratamientos tópicos","Inyectar medicamentos"], respuesta: 1 }
    ],
    3: [
        { pregunta: "¿Cuál es el criterio principal para derivar al especialista?", opciones: ["Lesiones que no mejoran con tratamiento inicial","Solo cuando el paciente lo pide","Siempre en la primera consulta","Cuando la lesión supera 1 cm"], respuesta: 0 },
        { pregunta: "El fotodaño solar acumulado es causa principal de:", opciones: ["Acné rosácea","Cáncer de piel","Dermatitis seborreica","Vitiligo"], respuesta: 1 },
        { pregunta: "¿Qué tipo de corticoide tópico se usa en zonas de piel delgada?", opciones: ["Alta potencia","Muy alta potencia","Baja potencia","Ultra alta potencia"], respuesta: 2 }
    ],
    4: [
        { pregunta: "¿Cuál es la dermatosis más frecuente en niños?", opciones: ["Psoriasis","Dermatitis atópica","Vitiligo","Esclerodermia"], respuesta: 1 },
        { pregunta: "¿Qué exantema infantil causa la enfermedad de la 'bofetada'?", opciones: ["Rubéola","Varicela","Eritema infeccioso (Parvovirus B19)","Roséola"], respuesta: 2 },
        { pregunta: "Los hemangiomas infantiles típicamente:", opciones: ["Crecen toda la vida","Involucionan solos con el tiempo","Requieren siempre cirugía","Son malignos"], respuesta: 1 }
    ],
    5: [
        { pregunta: "La regla ABCDE para revisar lunares: ¿qué significa la 'A'?", opciones: ["Acidez","Asimetría","Amarillo","Adherencia"], respuesta: 1 },
        { pregunta: "¿Cuál es el factor de riesgo más importante para el cáncer de piel?", opciones: ["Dieta alta en grasas","Exposición acumulada al sol sin protección","Uso de cosméticos","Herencia exclusivamente"], respuesta: 1 },
        { pregunta: "¿Con qué frecuencia mínima debes reaplicar el protector solar?", opciones: ["Cada 6 horas","Una sola vez al día","Cada 2 horas o tras nadar/sudar","Solo cuando hay sol directo"], respuesta: 2 }
    ],
    6: [
        { pregunta: "¿Qué ingrediente debes EVITAR si tienes piel muy sensible?", opciones: ["Niacinamida","Alcohol desnaturalizado en altas concentraciones","Ácido hialurónico","Pantenol"], respuesta: 1 },
        { pregunta: "¿Qué significa que un producto es 'no comedogénico'?", opciones: ["Que no mancha la ropa","Que no obstruye los poros","Que no tiene olor","Que es para piel grasa únicamente"], respuesta: 1 },
        { pregunta: "¿Cuál es el primer paso en una rutina de cuidado facial correcta?", opciones: ["Hidratante","Protector solar","Limpieza","Sérum"], respuesta: 2 }
    ],
    7: [
        { pregunta: "¿Cuántos vasos de agua al día se recomiendan?", opciones: ["2-3","4-5","8 o más","Solo depende del clima"], respuesta: 2 },
        { pregunta: "¿Qué nutriente es esencial para la producción de colágeno?", opciones: ["Vitamina A","Vitamina C","Vitamina D","Hierro"], respuesta: 1 },
        { pregunta: "El estrés crónico puede provocar en la piel:", opciones: ["Mejor tono","Brotes de acné y psoriasis","Aumento del colágeno","Reducción de arrugas"], respuesta: 1 }
    ],
    8: [
        { pregunta: "¿Cuál es el tipo de acné MÁS severo?", opciones: ["Comedones cerrados","Pústulas superficiales","Acné nódulo-quístico","Puntos negros"], respuesta: 2 },
        { pregunta: "El ácido salicílico en el acné actúa principalmente:", opciones: ["Matando bacterias","Exfoliando dentro del poro (queratolítico)","Hidratando la piel","Bloqueando el sol"], respuesta: 1 },
        { pregunta: "¿Cuál de estos alimentos se asocia más con brotes de acné?", opciones: ["Frutas rojas","Verduras verdes","Lácteos con alto índice glucémico","Proteína magra"], respuesta: 2 }
    ],
    9: [
        { pregunta: "¿Cuál ingrediente tiene mayor evidencia científica antienvejecimiento?", opciones: ["Extracto de rosas","Retinol (Vitamina A)","Colágeno tópico","Agua termal"], respuesta: 1 },
        { pregunta: "¿Cuál es la causa número 1 del envejecimiento prematuro?", opciones: ["Falta de sueño","Exposición solar sin protección","Contaminación","Genética"], respuesta: 1 },
        { pregunta: "El ácido hialurónico en cosmética funciona porque:", opciones: ["Produce colágeno nuevo","Atrae y retiene agua en la piel","Elimina arrugas permanentemente","Bloquea la melanina"], respuesta: 1 }
    ],
    10: [
        { pregunta: "¿Qué diferencia una alergia de una irritación cutánea?", opciones: ["La alergia siempre es más grave visualmente","La alergia involucra respuesta inmune; la irritación es daño directo","Son exactamente lo mismo","La irritación solo ocurre en niños"], respuesta: 1 },
        { pregunta: "¿Cuál es el alérgeno más común en cosméticos?", opciones: ["Agua","Fragancias y conservantes","Vitamina E","Ácido cítrico"], respuesta: 1 },
        { pregunta: "Ante una reacción alérgica con hinchazón y dificultad para respirar, debes:", opciones: ["Aplicar crema hidratante y esperar","Tomar antihistamínico y continuar el día","Ir a urgencias de inmediato","Lavar con agua fría únicamente"], respuesta: 2 }
    ],
    // Banco para Curso 11: Skincare para manchas
    11: [
        { pregunta: "¿Qué célula es responsable de producir melanina?", opciones: ["Queratinocito","Melanocito","Fibroblasto","Macrófago"], respuesta: 1 },
        { pregunta: "¿Cuál de estos ingredientes inhibe la tirosinasa para reducir manchas?", opciones: ["Ácido hialurónico","Vitamina C (ácido ascórbico)","Glicerina","Ceramidas"], respuesta: 1 },
        { pregunta: "El melasma hormonal se agrava principalmente por:", opciones: ["Agua fría","Exposición solar sin protección y cambios hormonales","Consumo de frutas cítricas","Ejercicio físico intenso"], respuesta: 1 },
        { pregunta: "PIH en el tratamiento de manchas significa:", opciones: ["Piel intensamente hidratada","Hiperpigmentación post-inflamatoria","Peeling intenso con hidroquinona","Pigmentación inducida por herencia"], respuesta: 1 },
        { pregunta: "¿Cuál es el paso MÁS importante en una rutina despigmentante?", opciones: ["Usar vitamina C a diario","Aplicar retinol por la noche","Usar protector solar todos los días","Exfoliar tres veces por semana"], respuesta: 2 },
        { pregunta: "Los ácidos AHA ayudan en manchas porque:", opciones: ["Bloquean la melanina dentro del melanocito","Exfolian capas superficiales y aceleran la renovación celular","Hidratan la dermis profunda","Estimulan el colágeno tipo IV"], respuesta: 1 }
    ]
};
