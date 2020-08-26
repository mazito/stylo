
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(anchor = null) {
            this.a = anchor;
            this.e = this.n = null;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.h(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const DefaultTheme = {

      fontFamilies: { 
        "default": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        "roboto": '"Roboto", sans-serif',
        "nunito": '"Nunito", sans-serif'
      },

      fontSizes: {
        xs: '12px', // caption 
        sm: '14px', // body 2
        nm: '16px', // body 1
        md: '18px', // h4
        lg: '22px', // h3
        xl: '26px', // h2
        h1: '36px', // h1
      },

      fontWeights: {
        'thin': '300',
        'normal': '400',
        'bold': '700'
      },

      fontStyles: {
        'italic': 'italic',
        'underline': 'underline'
      },

      lineHeights: {
        'crushed': '0.875em',
        'fit': '1em',
        'tight': '1.25em',
        'normal': '1.5em',
        'ample': '1.625em',
        'double': '2em'
      },

      colors: {
        // base colors
        primary: "#ef4801", //#C62828", // #e04b00, #f5715b,
        tertiary: '#2f2f4f',
        white: '#fff',
        black: '#000',

        // secondary color and variants
        secondary: {
          '': '#28e997',
          '--': '#28e997',
          '-': '#28e997',
          '+': 'hsl(155, 81%, 50%)',
          '++': 'hsl(155, 81%, 40%)',
          '+++': 'hsl(155, 81%, 32%)',
        },

        // back colors
        page: '#fafafa',
        surface: '#fff',

        // text body colors (on surface)
        body: {
          '': '#6a6a7f',
          '-': '#998999'
        },

        link: '#009688',

        // emotional colors
        danger: '#ff0000',
        warning: 'yellow',
        success: 'green',
        info: 'cyan',
        light: '#f5f5ff',
        dark: '#212141',

        // full palette
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        red: {
          100: '#fff5f5',
          200: '#fed7d7',
          300: '#feb2b2',
          400: '#fc8181',
          500: '#f56565',
          600: '#e53e3e',
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
        },
        orange: {
          100: '#fffaf0',
          200: '#feebc8',
          300: '#fbd38d',
          400: '#f6ad55',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e',
        },
        yellow: {
          100: '#fffff0',
          200: '#fefcbf',
          300: '#faf089',
          400: '#f6e05e',
          500: '#ecc94b',
          600: '#d69e2e',
          700: '#b7791f',
          800: '#975a16',
          900: '#744210',
        },
        green: {
          100: '#f0fff4',
          200: '#c6f6d5',
          300: '#9ae6b4',
          400: '#68d391',
          500: '#48bb78',
          600: '#38a169',
          700: '#2f855a',
          800: '#276749',
          900: '#22543d',
        },
        teal: {
          100: '#e6fffa',
          200: '#b2f5ea',
          300: '#81e6d9',
          400: '#4fd1c5',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
          800: '#285e61',
          900: '#234e52',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        indigo: {
          100: '#ebf4ff',
          200: '#c3dafe',
          300: '#a3bffa',
          400: '#7f9cf5',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
        purple: {
          100: '#faf5ff',
          200: '#e9d8fd',
          300: '#d6bcfa',
          400: '#b794f4',
          500: '#9f7aea',
          600: '#805ad5',
          700: '#6b46c1',
          800: '#553c9a',
          900: '#44337a',
        },
        pink: {
          100: '#fff5f7',
          200: '#fed7e2',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
          900: '#702459',
        },
      },

      shadows: {
        'shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'nm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xxl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },

      borders: {
        'border': '1px solid #eef',
        'wired': '1px dashed red',
        '0': '1px solid #fff',
        '1': '1px solid #eef',
        '2': '1px solid #dde',
        '3': '1px solid #ccd',
        '4': '1px solid #bbc',
        '5': '1px solid #aab',
      },

      radii: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'nm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        'round': '100%'
      },

      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'nm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        'auto': 'auto'
      },

      sizing: {
        'auto': 'auto'
      },

      iconSizes: {
        xs: '0.6rem',
        sm: '0.8rem',
        nm: '1rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
        xxl: '4rem',
      },

      icons: {
        'close': 'close'
      },

      breakpoints: {
        // uses min.width as breakpoint
        // 'xs' is '*' between 0 and 360
        'sm': 360,  // > 22.5rem => Phone
        'md': 768,  // > 48 rem => Tablet 
        'lg': 1024, // > 64 rem => Laptop
        'xl': 1280, // > 80rem => Desktop
      },
      
      // Extra domains added to Theme to validate 
      // other constrains but that are not themables

      positioning: {
        'fixed': 'fixed',
        'absolute': 'absolute',
        'relative': 'relative'
      },

      wraps: {
        'nowrap': 'nowrap'
      },

      cursors: {
        'pointer': 'pointer'
      },

      horizontalAligns: {
        'left': 'left',
        'center': 'center',
        'right': 'right',
        'justify': 'justify'
      },

      verticalAligns: {
        'top': 'top',
        'bottom': 'bottom',
        'middle': 'middle'
      },

      flexDirections: {
        'flex': 'row', // the default
        'row': 'row',
        'column': 'column'
      },

      flexJustifyContents: {
        'start': 'flex-start',
        'end': 'flex-end',
        'center': 'center',
        'between': 'space-between',
        'around': 'space-around',
        'evenly': 'space-evenly'
      },

      flexAlignItems: {
        'start': 'flex-start',
        'end': 'flex-end',
        'center': 'center',
        'baseline': 'baseline',
        'stretch': 'stretch',  
      },

      flexGrows: {
        'grow': '1',
        'no': '0'
      },

      flexShrinks: {
        true: '1',
        'shrink': '1',
        'no': '0'
      },

      booleans: {
        true: true,
        false: false
      }
    };

    /**
     * Build a compacted (hashed) dictionary for the given Theme Specification.
     * After level 1 all next levels are concatenated.
     * 
     * @created: mario.zito@treme.io - 2010-08-16
     */

    /*
      Example:
      
        colors: {
          primary: "#ef4801", 

          secondary: {
            '': '#28e997',
            '-': 'hsl(155, 81%, 70%)', // lighter
            '+': 'hsl(155, 81%, 50%)', // darker
          },
        }

      is compacted as:

        'colors.primary': "#ef4801", 
        'colors.secondary': '#28e997',
        'colors.secondary-': '#28e997',
        'colors.secondary+': 'hsl(155, 81%, 50%)',
      }
    */

    function compactLevel(key, original, level) {
      /**
       * Recursively compact it.
       * After level 1 all next levels are concatenated.
       */
      let d = {};
      level = level +1 ;

      Object.keys(original).map((k) => {

        if (typeof(original[k]) === 'string') {
          //if (!d[key]) d[key] = {} ;
          const sep = level > 2 ? '' : '.';
          const r = (k) ? key+sep+k : key ;
          d[r] = original[k];
        }

        else {
          let dl = compactLevel(key+(key?'.':'')+k, original[k], level) ;
          Object.keys(dl).map((t) => {
            d[t] = dl[t] ;
          });
        }
      });

      return d;
    }

    /**
     * A set of helper function for dealing with Breakpoints and Viewports
     * 
     * @created: mario.zito@treme.io - 2020-08-24
     */

    function sortBreakpoints(points) {
      /**
       * Creates valid viewports array from the Theme breakpoints.
       * @returns: an array of sorted viewports: [{ name: vw: }, ...]
       */
      // first add ALL (*) and Width=0 as first breakpoint point
      points['*'] = 0;

      // now build the array and sort by increasing width size
      let sorted = Object.keys(points)
        .map((p) => { 
          return { vw:points[p], name: p } 
        })
        .sort((a, b) => { 
          return (a.vw - b.vw)
        });

      return sorted ;
    }


    function selectOnBp(options, vps) {
      /**
       * Selects an option based on the currently active breakpoints.
       * @returns: the option corresponding to the bigger available Viewport.
       */
      let selected = null ;

      const vw = document.body.clientWidth; // current Vw width in pixels

      for (var j=0; j < vps.length; j++) {

        if (vw > vps[j].vw) {
          // this breakpoint is active
          const bp = vps[j].name ;

          // lets see if we have an option for this one
          if (options[bp] !== undefined) selected = options[bp];

          // we dont end here because we must use the bigger posible breakpoint
        }
      }

      return (selected !== null) 
        // if an option was found, just return it
        ? selected 
        // else we try to return the '*' (all) option or null
        : (options['*'] || null)
    }

    /**
     * Domains manager
     * ---------------
     * 
     * Given a Theme, it builds a set of domains mapping props values 
     * to Theme values.
     * 
     * @created: mario.zito@treme.io - 2020-08-20
     */

    let _domains = {};

    let _viewports = []; // sorted Viewports array defined by breakpoints

    function buildDomains(spec, extras) {
      _domains = compactLevel('', spec, 0);
      _viewports = spec.viewports; // fix it
    }


    /**
     * Domain functions
     * ----------------
     * 
     * They return a domain value getter function for the binded domain. 
     * Are used by others to bind a certain css property to a given domain, 
     * considering the domain type and restrictions.
     * 
     * **function domainFn(domain: string): function**
     * 
     * @domain: the domain to map.
     * @returns: the value getter (constrained, unconstrained, sized).
     * 
     * 
     * Domain value getters
     * --------------------
     * 
     * They return a Theme value 
     * if it exists or a valid value for the given domain,
     * considering its type:
     * 
     * A **constrained** getter accepts only values restricted
     * to the domain space, and will return Null otherwise.
     * Example: 'style' in the 'fontStyles' domain. 
     * 
     * An **unconstrained** getter will test if the value is in 
     * the domain space and return the Theme value if it exists,
     * but if not in the domain space will return the given value.
     * Example: 'border' prop in 'borders' domain.
     * 
     * A **sized** getter will test if the value is in the domain 
     * space and return the Theme value if it exists, but it will 
     * accept any value as long as it is using a size unit such 
     * as 'px' (or '%', 'em', 'rem', etc...). If a number is given
     * it will assume 'rem' units. 
     * Examples: 'p' prop in the 'spacing' domain, 'w' prop in the 
     * 'sizing' domain.
     */

    function constrained(domain) {
      /**
       * Use ONLY the theme value if it exists, 
       * else => ignore its value and return null
       */
      return function(val) {
        let vx = (typeof(val) === 'object') ? selectOnBp(val, _viewports) : val;
        return(
          (vx === null || vx === undefined) 
            ? null
            : _domains[`${domain}.${vx}`] || null
        )
      }
    }

    function unconstrained(domain){
      /**
       *  Use the theme value if it exists, 
       *  else => use the given value as it was given 
       */ 
      return function(val) {
        let vx = (typeof(val) === 'object') ? selectOnBp(val, _viewports) : val;
        return(
          (vx === null || vx === undefined) 
            ? null
            : _domains[`${domain}.${vx}`] || vx
        )
      }
    }

    function sized(domain) {
      /**
       * Use the theme value if it exists,
       * else if string => use the given value as it was given 
       * or if a number => convert it to rem units
       */
      return function(val) {
        let vx = (typeof(val) === 'object') ? selectOnBp(val, _viewports) : val;
        return (
          (vx === null || vx === undefined) 
            ? null
            : _domains[`${domain}.${vx}`] || measure(vx) || null
        )
      }
    }

    function measure(val) {
      /**
       * Evaluates a value to determine if it is has a valid unit,
       * or if we must assume rem units.
       */
      return (
        // can't use !val because in this particular case 
        // 0 is a valid value and must not be considered false.
        (val===undefined || val===null || val==='') 
          ? null
          : ((''+val).includes('%') || 
            (''+val).includes('px') || 
            (''+val).includes('pt') || 
            (''+val).includes('rem') ||
            (''+val).includes('em') ||
            (''+val).includes('ch') ||
            (''+val).includes('vmin') ||
            (''+val).includes('vmax') ||
            (''+val).includes('vw') ||
            (''+val).includes('vh'))
            ? val 
            : val+'rem'
      )
    }

    let _themes = {
      'default': DefaultTheme
    }; 

    let _wireframesOn = false;

    let _current = _themes['default'];


    var Theme = {
      
      build(name, spec) {
        /**
         * Builds the new Theme using the given Specification.
         */
        _themes[name] = spec || DefaultTheme;
        _themes[name].viewports = sortBreakpoints(_themes[name].breakpoints);
        return this;
      },
      
      wireframes(state) {
        if (state === undefined) return _wireframesOn;
        _wireframesOn = state; // True or False
        return this;
      },

      active(name) {
        /**
         * Activates the named theme and returns it.
         */
        if (!name) return _current;
        _current = _themes[name] || _themes['default'];
        buildDomains(_current);
        return _current;
      },
    };

    /**
     * Maps a received property (in $$props) to a certain domain, 
     * its type (restricted, unrestricted, sized), and to a specific
     * CSS property.
     */
    const CssMapper = {
      // '': maps(domainFn, 'css-property'),

      'w': maps(sized('sizing'), 'width'),
      'width': maps(sized('sizing'), 'width'),
      'h': maps(sized('sizing'), 'height'),
      'height': maps(sized('sizing'), 'height'),
      'maxw': maps(sized('sizing'), 'max-width'),
      'max-width': maps(sized('sizing'), 'max-width'),
      'maxh': maps(sized('sizing'), 'max-height'),
      'max-height': maps(sized('sizing'), 'max-height'),
      'minw': maps(sized('sizing'), 'min-width'),
      'min-width': maps(sized('sizing'), 'min-width'),
      'minh': maps(sized('sizing'), 'min-height'),
      'min-height': maps(sized('sizing'), 'min-height'),

      'p': maps(sized('spacing'), 'padding'),
      'pl': maps(sized('spacing'), 'padding-left'),
      'pr': maps(sized('spacing'), 'padding-right'),
      'pb': maps(sized('spacing'), 'padding-bottom'),
      'pt': maps(sized('spacing'), 'padding-top'),
      'padding': maps(sized('spacing'), 'padding'),
      'padding-left': maps(sized('spacing'), 'padding-left'),
      'padding-right': maps(sized('spacing'), 'padding-right'),
      'padding-bottom': maps(sized('spacing'), 'padding-bottom'),
      'padding-top': maps(sized('spacing'), 'padding-top'),

      'm': maps(sized('spacing'), 'margin'),
      'ml': maps(sized('spacing'), 'margin-left'),
      'mr': maps(sized('spacing'), 'margin-right'),
      'mt': maps(sized('spacing'), 'margin-top'),
      'mb': maps(sized('spacing'), 'margin-bottom'),
      'margin': maps(sized('spacing'), 'margin'),
      'margin-left': maps(sized('spacing'), 'margin-left'),
      'margin-right': maps(sized('spacing'), 'margin-right'),
      'margin-top': maps(sized('spacing'), 'margin-top'),
      'margin-bottom': maps(sized('spacing'), 'margin-bottom'),

      'rounded': maps(sized('radii'), 'border-radius'),
      'border-radius': maps(sized('radii'), 'border-radius'),

      'position': maps(constrained('positioning'), 'position'),
      'left': maps(sized('sizing'), 'left'),
      'top': maps(sized('sizing'), 'top'),
      'right': maps(sized('sizing'), 'right'),
      'bottom': maps(sized('sizing'), 'bottom'),

      'overflow': maps(constrained(''), 'overflow'),
      
      'color': maps(unconstrained('colors'), 'color'),
      'bg': maps(unconstrained('colors'), 'background-color'),
      'background-color': maps(unconstrained('colors'), 'background-color'),

      'border': maps(unconstrained('borders'), 'border'),
      'border-top': maps(unconstrained('borders'), 'border-top'),
      'border-left': maps(unconstrained('borders'), 'border-left'),
      'border-bottom': maps(unconstrained('borders'), 'border-bottom'),
      'border-right': maps(unconstrained('borders'), 'border-right'),
      /*
      'border-top-left-radius': measure(props.borderTopLeftRadius) || null,
      'border-bottom-left-radius': measure(props.borderBottomLeftRadius) || null,
      'border-top-right-radius': measure(props.borderTopRightRadius) || null,
      'border-bottom-right-radius': measure(props.borderBottomRightRadius) || null,
      */

      'shadow': maps(unconstrained('shadows'), 'box-shadow'),
      'box-shadow': maps(unconstrained('shadows'), 'box-shadow'),
      
      // Typography
      'family': maps(constrained('fontFamilies'), 'font-family'),
      'font-family': maps(constrained('fontFamilies'), 'font-family'),
      'font-size': maps(unconstrained('fontSizes'), 'font-size'),
      'weight': maps(constrained('fontWeights'), 'font-weight'),
      'font-weight': maps(constrained('fontWeights'), 'font-weight'),
      'style': maps(constrained('fontStyles'), 'font-styles'),
      'font-style': maps(constrained('fontStyles'), 'font-styles'),
      'line': maps(sized('lineHeights'), 'line-height'),
      'line-height': maps(sized('lineHeights'), 'line-height'),
      //'text-decoration': Theme.fontStyle(props.fontWeight) || null,
      
      // review
      'nowrap': maps(constrained('wraps'), 'white-space'),
      'white-space':  maps(constrained('wraps'), 'white-space'),

      'align': maps(constrained('horizontalAligns'), 'text-align'),
      'text-align': maps(constrained('horizontalAligns'), 'text-align'),
      'vertical': maps(constrained('verticalAligns'), 'vertical-align'),
      'vertical-alignment': maps(constrained('verticalAligns'), 'vertical-align'),
      
      'cursor': maps(constrained('cursors'), 'cursor'),
      
      // Flex props  
      'flex': maps(constrained('flexDirections'), 'flex-direction'),
      'flex-direction': maps(constrained('flexDirections'), 'flex-direction'),
      'items': maps(constrained('flexAlignItems'), 'align-items'),
      'align-items': maps(constrained('flexAlignItems'), 'align-items'),
      'justify': maps(constrained('flexJustifyContents'), 'justify-content'),
      'justify-content': maps(constrained('flexJustifyContents'), 'justify-content'),
      'grow': maps(constrained('flexGrows'), 'flex-grow'),
      'flex-grow': maps(constrained('flexGrows'), 'flex-grow'),
      'shrink': maps(constrained('flexShrinks'), 'flex-shrink'),
      'flex-shrink': maps(constrained('flexShrinks'), 'flex-shrink'),
      //'flex': (!!props.grow ? '1 1 auto' : null || 
      // !!props.shrink && props.shrink==='no' ? 'none' : null),
      
      // 'hidden' is a very special property, because its not included in CSS
      // but we need it as a visibility toggler
      'visible': maps(unconstrained('booleans'), 'visible'),
      /*
      '': maps(constrained(''), ''),
      '': maps(unconstrained(''), ''),
      '': maps(sized(''), ''),
      */
    };


    function maps(domainFn, prop) {
      /**
       * The mapping function binding a domain to a CSS property.
       * @domainFn: is a domain fn (sized,constrained,unconstrained).
       * @prop: is the prop to map, received in $$props. 
       * @returns: the domain value getter function. 
       */
      console.log("Maps ", prop);
      return function(value) {
        /**
         * A value getter function.
         * @value: a prop value
         * @returns: the theme value if it exists, or null
         */
        let v = domainFn(value);
        return(v !== null ? `${prop}:${v}` : null);
      }
    }

    function Css(props) {

      // copy ALL props, they will be filtered latter
      let _props = {...props}; 

      /*
        **Shorthands** are short names for some specific properties,
        but note that explicitly defined props will take precedence over 
        shorthand names. 
        Example: <Panel fixed position="relative"
        will result in position="relative" being set instead of 'fixed'
      */
      const _shorts = [
        [['fixed','absolute','relative'], 'position'],
        [['round'], 'border-radius'],
        [['pointer'], 'cursor'],
        [['nowrap'], 'white-space'],
        [['grow'], 'flex-grow'],
        [['shrink'], 'flex-shrink'],
        [['flex'], 'flex-direction'],
        [['shadow'], 'box-shadow'],
        [['border','wired'], 'border'], 
      ];

      /*
        Synonyms are props that affect a group of similar props,
        such as mx sets margins left and right
        Example: <Panel mx=1
        will result in ml=1 mr=1
      */
      const _synonyms = {
        'mx': ['ml','mr'],
        'my': ['mt','mb'],
        'px': ['pl','pr'],
        'py': ['pt','pb'],
      };

      return ({

        shorthand(options, prop) {
          let rs = (options || []).filter((opt) => {
            // only use shorthand if it has NO other value
            // example: '<Panel border ...' uses the shorthand 
            // but: '<Panel border="1" ...' must NOT use it
            return _props[opt] !== undefined && _props[opt] === true
          });
          if (rs && rs.length > 0) _props[prop] = rs[0];
          return this; // enable chaining it
        },

        whitelist(allowed) {
          return this; // enable chaining it
        },

        blacklist(forbidden) {
          return this; // enable chaining it
        },

        styled() {
          // first process global shorthands
          _shorts.map((v) => { 
            this.shorthand(v[0], v[1]); 
          });

          // now replace synonyms if they exist
          Object.keys(_synonyms).map((k) => {
            if (_props[k] !== undefined) {
              _synonyms[k].map((t) => {
                _props[t] = _props[k];
              });
            }
          });

          // now apply all valid mapped styles 
          let styles = Object.keys(_props)
            .filter((p) => CssMapper[p] !== undefined && _props[p] !== null)
            .map((p) => CssMapper[p](_props[p]));

          // return a formatted 'style' string
          return styles.join(';');
        },

        classes() {
          /**
           * A very limited set of utility classes, necessary 
           * for additional behaviour in some special cases, 
           * example: hover='some-global-hover-class'
           */
          return(''
            + (!!_props.flex ? ' flexed' : '')
            + (!!_props.transparent ? ' transparent' : '')
            + (!!_props.hover ? (_props.hover !== true ? ' '+_props.hover : ' hover') : '')
            + (Theme.wireframes() ? ' wireframe' : '')
            + (!!_props.markdown ? ' markdown' : '')
          );
        },

        visible(defalt) {
          /**
           * Returns calculated visibility if 'visible' prop is defined,
           * otherwise it returns the given default value
           */
          return (
            !!_props.visible 
              ? (CssMapper['visible'](_props.visible)==='visible:true') 
              : defalt
          );
        }
      })
    }

    /* home/mzito/dev/work/stylo/pkg/src/layouts/Page.svelte generated by Svelte v3.24.1 */
    const file = "home/mzito/dev/work/stylo/pkg/src/layouts/Page.svelte";

    // (1:0) {#if show}
    function create_if_block(ctx) {
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "page " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-1036cym");
    			attr_dev(div, "style", div_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled());
    			add_location(div, file, 1, 2, 13);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*css*/ 4 && div_class_value !== (div_class_value = "page " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-1036cym")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*css*/ 4 && div_style_value !== (div_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled())) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(1:0) {#if show}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[5]);
    	let if_block = /*show*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "resize", /*onwindowresize*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*show*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { show = true } = $$props;
    	let vw = 0, css = null;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Page", $$slots, ['default']);

    	function onwindowresize() {
    		$$invalidate(1, vw = window.innerWidth);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("show" in $$new_props) $$invalidate(0, show = $$new_props.show);
    		if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Css, show, vw, css });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    		if ("show" in $$props) $$invalidate(0, show = $$new_props.show);
    		if ("vw" in $$props) $$invalidate(1, vw = $$new_props.vw);
    		if ("css" in $$props) $$invalidate(2, css = $$new_props.css);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		 if (vw) {
    			$$invalidate(2, css = Css($$props));
    			$$invalidate(0, show = css.visible(show));
    			console.log("Page", css);
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [show, vw, css, $$scope, $$slots, onwindowresize];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { show: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get show() {
    		throw new Error("<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* home/mzito/dev/work/stylo/pkg/src/layouts/Panel.svelte generated by Svelte v3.24.1 */
    const file$1 = "home/mzito/dev/work/stylo/pkg/src/layouts/Panel.svelte";

    // (1:0) {#if show}
    function create_if_block$1(ctx) {
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "panel " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-1w0xn3a");
    			attr_dev(div, "style", div_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled());
    			add_location(div, file$1, 1, 2, 13);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*css*/ 4 && div_class_value !== (div_class_value = "panel " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-1w0xn3a")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*css*/ 4 && div_style_value !== (div_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled())) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(1:0) {#if show}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[6]);
    	let if_block = /*show*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "resize", /*onwindowresize*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*show*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { show = true } = $$props;
    	let vw = 0, css = null;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Panel", $$slots, ['default']);

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function onwindowresize() {
    		$$invalidate(1, vw = window.innerWidth);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("show" in $$new_props) $$invalidate(0, show = $$new_props.show);
    		if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Css, show, vw, css });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    		if ("show" in $$props) $$invalidate(0, show = $$new_props.show);
    		if ("vw" in $$props) $$invalidate(1, vw = $$new_props.vw);
    		if ("css" in $$props) $$invalidate(2, css = $$new_props.css);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		 if (vw) {
    			$$invalidate(2, css = Css($$props));
    			$$invalidate(0, show = css.visible(show));
    			console.log("$ Panel vw=", vw, show);
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [show, vw, css, $$scope, $$slots, click_handler, onwindowresize];
    }

    class Panel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { show: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Panel",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get show() {
    		throw new Error("<Panel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Panel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* home/mzito/dev/work/stylo/pkg/src/layouts/Box.svelte generated by Svelte v3.24.1 */
    const file$2 = "home/mzito/dev/work/stylo/pkg/src/layouts/Box.svelte";

    // (1:0) {#if show}
    function create_if_block$2(ctx) {
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "box " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-ernmb0");
    			attr_dev(div, "style", div_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled());
    			add_location(div, file$2, 1, 2, 13);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*css*/ 4 && div_class_value !== (div_class_value = "box " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-ernmb0")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*css*/ 4 && div_style_value !== (div_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled())) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(1:0) {#if show}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[6]);
    	let if_block = /*show*/ ctx[0] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "resize", /*onwindowresize*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*show*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { show = true } = $$props;
    	let vw = 0, css = null;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Box", $$slots, ['default']);

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function onwindowresize() {
    		$$invalidate(1, vw = window.innerWidth);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("show" in $$new_props) $$invalidate(0, show = $$new_props.show);
    		if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Css, show, vw, css });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    		if ("show" in $$props) $$invalidate(0, show = $$new_props.show);
    		if ("vw" in $$props) $$invalidate(1, vw = $$new_props.vw);
    		if ("css" in $$props) $$invalidate(2, css = $$new_props.css);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		 if (vw) {
    			$$invalidate(2, css = Css($$props));
    			$$invalidate(0, show = css.visible(show));
    			console.log("Box", css);
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [show, vw, css, $$scope, $$slots, click_handler, onwindowresize];
    }

    class Box extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { show: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Box",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get show() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* home/mzito/dev/work/stylo/pkg/src/layouts/Overlay.svelte generated by Svelte v3.24.1 */
    const file$3 = "home/mzito/dev/work/stylo/pkg/src/layouts/Overlay.svelte";

    // (1:0) {#if show}
    function create_if_block$3(ctx) {
    	let div3;
    	let div0;
    	let div0_class_value;
    	let div0_transition;
    	let t;
    	let div2;
    	let div1;
    	let div1_class_value;
    	let div2_transition;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t = space();
    			div2 = element("div");
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", div0_class_value = "overlay " + (/*css*/ ctx[4] && /*css*/ ctx[4].classes()) + " svelte-1hhmkmk");
    			add_location(div0, file$3, 2, 2, 19);
    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(/*centered*/ ctx[2] ? " centered" : "") + " svelte-1hhmkmk"));
    			add_location(div1, file$3, 12, 4, 288);
    			attr_dev(div2, "class", "content svelte-1hhmkmk");
    			add_location(div2, file$3, 7, 2, 139);
    			add_location(div3, file$3, 1, 0, 11);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t);
    			append_dev(div3, div2);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", self(/*click_handler*/ ctx[8]), false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*css*/ 16 && div0_class_value !== (div0_class_value = "overlay " + (/*css*/ ctx[4] && /*css*/ ctx[4].classes()) + " svelte-1hhmkmk")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*centered*/ 4 && div1_class_value !== (div1_class_value = "" + (null_to_empty(/*centered*/ ctx[2] ? " centered" : "") + " svelte-1hhmkmk"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, { delay: 20, duration: 300 }, true);
    				div0_transition.run(1);
    			});

    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, { delay: 150, duration: 300 }, true);
    				div2_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, { delay: 20, duration: 300 }, false);
    			div0_transition.run(0);
    			transition_out(default_slot, local);
    			if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, { delay: 150, duration: 300 }, false);
    			div2_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (detaching && div0_transition) div0_transition.end();
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div2_transition) div2_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(1:0) {#if show}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[7]);
    	let if_block = /*show*/ ctx[0] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "resize", /*onwindowresize*/ ctx[7]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*show*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { show = false } = $$props,
    		{ modal = false } = $$props,
    		{ centered = true } = $$props;

    	let vw = 0, css = null;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Overlay", $$slots, ['default']);

    	function onwindowresize() {
    		$$invalidate(3, vw = window.innerWidth);
    	}

    	const click_handler = () => {
    		$$invalidate(0, show = !modal ? false : show);
    	};

    	$$self.$$set = $$new_props => {
    		$$invalidate(9, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("show" in $$new_props) $$invalidate(0, show = $$new_props.show);
    		if ("modal" in $$new_props) $$invalidate(1, modal = $$new_props.modal);
    		if ("centered" in $$new_props) $$invalidate(2, centered = $$new_props.centered);
    		if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Css, show, modal, centered, vw, css });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(9, $$props = assign(assign({}, $$props), $$new_props));
    		if ("show" in $$props) $$invalidate(0, show = $$new_props.show);
    		if ("modal" in $$props) $$invalidate(1, modal = $$new_props.modal);
    		if ("centered" in $$props) $$invalidate(2, centered = $$new_props.centered);
    		if ("vw" in $$props) $$invalidate(3, vw = $$new_props.vw);
    		if ("css" in $$props) $$invalidate(4, css = $$new_props.css);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		 if (vw) {
    			$$invalidate(4, css = Css($$props));
    			$$invalidate(0, show = css.visible(show));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		show,
    		modal,
    		centered,
    		vw,
    		css,
    		$$scope,
    		$$slots,
    		onwindowresize,
    		click_handler
    	];
    }

    class Overlay extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { show: 0, modal: 1, centered: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Overlay",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get show() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get modal() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modal(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get centered() {
    		throw new Error("<Overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set centered(value) {
    		throw new Error("<Overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* home/mzito/dev/work/stylo/pkg/src/layouts/Popover.svelte generated by Svelte v3.24.1 */

    let activePop = writable(null);
    activePop.set(null);
    console.log("Active Pop");

    /* home/mzito/dev/work/stylo/pkg/src/elements/Label.svelte generated by Svelte v3.24.1 */
    const file$4 = "home/mzito/dev/work/stylo/pkg/src/elements/Label.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "text " + /*css*/ ctx[0].classes() + " svelte-19ddsb");
    			attr_dev(div, "style", div_style_value = /*css*/ ctx[0].styled());
    			add_location(div, file$4, 41, 0, 1215);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let css = Css($$props).shorthand(["xs", "sm", "nm", "md", "lg", "xl", "h2", "h1"], "font-size").shorthand(["italic", "underline"], "font-style").shorthand(["normal", "bold", "thin"], "font-weight").shorthand(["center", "left", "right", "justify"], "text-align").shorthand(["nowrap"], "white-space").shorthand(["middle", "top", "bottom"], "vertical-alignment");
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Label", $$slots, ['default']);

    	$$self.$$set = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("$$scope" in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Css, css });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    		if ("css" in $$props) $$invalidate(0, css = $$new_props.css);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [css, $$scope, $$slots];
    }

    class Label extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Label",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* home/mzito/dev/work/stylo/pkg/src/elements/Button.svelte generated by Svelte v3.24.1 */
    const file$5 = "home/mzito/dev/work/stylo/pkg/src/elements/Button.svelte";

    // (1:0) {#if show}
    function create_if_block$4(ctx) {
    	let button;
    	let button_class_value;
    	let button_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", button_class_value = "button " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-ty8jd4");
    			attr_dev(button, "style", button_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled());
    			add_location(button, file$5, 1, 2, 13);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*css*/ 4 && button_class_value !== (button_class_value = "button " + (/*css*/ ctx[2] && /*css*/ ctx[2].classes()) + " svelte-ty8jd4")) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (!current || dirty & /*css*/ 4 && button_style_value !== (button_style_value = /*css*/ ctx[2] && /*css*/ ctx[2].styled())) {
    				attr_dev(button, "style", button_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(1:0) {#if show}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[6]);
    	let if_block = /*show*/ ctx[0] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "resize", /*onwindowresize*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*show*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { show = true } = $$props;
    	let vw = 0, css = null;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, ['default']);

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function onwindowresize() {
    		$$invalidate(1, vw = window.innerWidth);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("show" in $$new_props) $$invalidate(0, show = $$new_props.show);
    		if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Css, show, vw, css });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    		if ("show" in $$props) $$invalidate(0, show = $$new_props.show);
    		if ("vw" in $$props) $$invalidate(1, vw = $$new_props.vw);
    		if ("css" in $$props) $$invalidate(2, css = $$new_props.css);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		 if (vw) {
    			$$invalidate(2, css = Css($$props).shorthand(["xs", "sm", "nm", "md", "lg", "xl"], "font-size").shorthand(["normal", "bold", "thin"], "font-weight").shorthand(["center", "left", "right", "justify"], "text-align").shorthand(["nowrap"], "white-space").shorthand(["middle", "top", "bottom"], "vertical-alignment"));
    			$$invalidate(0, show = css.visible(show));
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [show, vw, css, $$scope, $$slots, click_handler, onwindowresize];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { show: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get show() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/examples/panels.svelte generated by Svelte v3.24.1 */
    const file$6 = "src/examples/panels.svelte";

    // (16:4) <Button       sm px="nm" py="sm" mt="nm" hover       on:click={() => {show=false;}}       >
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Close me !");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(16:4) <Button       sm px=\\\"nm\\\" py=\\\"sm\\\" mt=\\\"nm\\\" hover       on:click={() => {show=false;}}       >",
    		ctx
    	});

    	return block;
    }

    // (4:2) <Panel     bg="surface"      color="secondary++"     border      shadow="lg"     rounded="sm"     line="ample"     px="nm" pt="md" pb="sm"     >
    function create_default_slot_1(ctx) {
    	let t0;
    	let br;
    	let t1;
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				sm: true,
    				px: "nm",
    				py: "sm",
    				mt: "nm",
    				hover: true,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[1]);

    	const block = {
    		c: function create() {
    			t0 = text("A panel with background, color, border, shadow, radii, padding\n    and margin using default Theme values.\n    ");
    			br = element("br");
    			t1 = space();
    			create_component(button.$$.fragment);
    			add_location(br, file$6, 14, 4, 303);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(4:2) <Panel     bg=\\\"surface\\\"      color=\\\"secondary++\\\"     border      shadow=\\\"lg\\\"     rounded=\\\"sm\\\"     line=\\\"ample\\\"     px=\\\"nm\\\" pt=\\\"md\\\" pb=\\\"sm\\\"     >",
    		ctx
    	});

    	return block;
    }

    // (1:0) <Overlay    bind:show={show}    centered>
    function create_default_slot(ctx) {
    	let panel;
    	let current;

    	panel = new Panel({
    			props: {
    				bg: "surface",
    				color: "secondary++",
    				border: true,
    				shadow: "lg",
    				rounded: "sm",
    				line: "ample",
    				px: "nm",
    				pt: "md",
    				pb: "sm",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(panel.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(panel, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const panel_changes = {};

    			if (dirty & /*$$scope, show*/ 9) {
    				panel_changes.$$scope = { dirty, ctx };
    			}

    			panel.$set(panel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(panel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(panel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(panel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(1:0) <Overlay    bind:show={show}    centered>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let overlay;
    	let updating_show;
    	let current;

    	function overlay_show_binding(value) {
    		/*overlay_show_binding*/ ctx[2].call(null, value);
    	}

    	let overlay_props = {
    		centered: true,
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*show*/ ctx[0] !== void 0) {
    		overlay_props.show = /*show*/ ctx[0];
    	}

    	overlay = new Overlay({ props: overlay_props, $$inline: true });
    	binding_callbacks.push(() => bind(overlay, "show", overlay_show_binding));

    	const block = {
    		c: function create() {
    			create_component(overlay.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(overlay, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const overlay_changes = {};

    			if (dirty & /*$$scope, show*/ 9) {
    				overlay_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_show && dirty & /*show*/ 1) {
    				updating_show = true;
    				overlay_changes.show = /*show*/ ctx[0];
    				add_flush_callback(() => updating_show = false);
    			}

    			overlay.$set(overlay_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(overlay.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(overlay.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(overlay, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { show = false } = $$props;
    	const writable_props = ["show"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Panels> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Panels", $$slots, []);

    	const click_handler = () => {
    		$$invalidate(0, show = false);
    	};

    	function overlay_show_binding(value) {
    		show = value;
    		$$invalidate(0, show);
    	}

    	$$self.$$set = $$props => {
    		if ("show" in $$props) $$invalidate(0, show = $$props.show);
    	};

    	$$self.$capture_state = () => ({ Panel, Overlay, Button, show });

    	$$self.$inject_state = $$props => {
    		if ("show" in $$props) $$invalidate(0, show = $$props.show);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, click_handler, overlay_show_binding];
    }

    class Panels extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { show: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Panels",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get show() {
    		throw new Error("<Panels>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Panels>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/docs/Intro.md generated by Svelte v3.24.1 */
    const file$7 = "src/docs/Intro.md";

    function create_fragment$7(ctx) {
    	let p0;
    	let t1;
    	let p1;
    	let t2;
    	let strong;
    	let t4;
    	let a0;
    	let t6;
    	let a1;
    	let t8;
    	let t9;
    	let p2;
    	let t10;
    	let a2;
    	let t12;
    	let t13;
    	let p3;
    	let t15;
    	let html_tag;
    	let t16;
    	let button;
    	let t18;
    	let panelexample;
    	let updating_show;
    	let t19;
    	let h20;
    	let t21;
    	let p4;
    	let t23;
    	let ul0;
    	let li0;
    	let p5;
    	let code0;
    	let t25;
    	let t26;
    	let li1;
    	let p6;
    	let code1;
    	let t28;
    	let t29;
    	let li2;
    	let p7;
    	let code2;
    	let t31;
    	let t32;
    	let li3;
    	let p8;
    	let code3;
    	let t34;
    	let t35;
    	let li4;
    	let p9;
    	let code4;
    	let t37;
    	let t38;
    	let li5;
    	let p10;
    	let code5;
    	let t40;
    	let t41;
    	let li6;
    	let p11;
    	let code6;
    	let t43;
    	let t44;
    	let h21;
    	let t46;
    	let ul1;
    	let li7;
    	let p12;
    	let t48;
    	let li8;
    	let p13;
    	let t50;
    	let li9;
    	let p14;
    	let t52;
    	let li10;
    	let p15;
    	let t54;
    	let li11;
    	let p16;
    	let t56;
    	let li12;
    	let p17;
    	let t58;
    	let li13;
    	let p18;
    	let t60;
    	let li14;
    	let p19;
    	let current;
    	let mounted;
    	let dispose;

    	function panelexample_show_binding(value) {
    		/*panelexample_show_binding*/ ctx[2].call(null, value);
    	}

    	let panelexample_props = {};

    	if (/*exampleNum*/ ctx[0] !== void 0) {
    		panelexample_props.show = /*exampleNum*/ ctx[0];
    	}

    	panelexample = new Panels({
    			props: panelexample_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(panelexample, "show", panelexample_show_binding));

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Stylo is a set of utility components and functions for quickly building theme-based user interfaces.";
    			t1 = space();
    			p1 = element("p");
    			t2 = text("It's ");
    			strong = element("strong");
    			strong.textContent = "loosely";
    			t4 = text(" based on ");
    			a0 = element("a");
    			a0.textContent = "Styled System";
    			t6 = text(" ideas and ");
    			a1 = element("a");
    			a1.textContent = "Theme specification";
    			t8 = text(".");
    			t9 = space();
    			p2 = element("p");
    			t10 = text("Styling is applied using normal Svelte properties, taken from ");
    			a2 = element("a");
    			a2.textContent = "a theme-aware set of CSS properties (and shorthands)";
    			t12 = text(".");
    			t13 = space();
    			p3 = element("p");
    			p3.textContent = "Example:";
    			t15 = space();
    			t16 = space();
    			button = element("button");
    			button.textContent = "Show me";
    			t18 = space();
    			create_component(panelexample.$$.fragment);
    			t19 = space();
    			h20 = element("h2");
    			h20.textContent = "Layout components";
    			t21 = space();
    			p4 = element("p");
    			p4.textContent = "The basic building block for creating a UI. All layout components are unstyled by default, as they usually act as containers for other UI components.";
    			t23 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			p5 = element("p");
    			code0 = element("code");
    			code0.textContent = "Page";
    			t25 = text(": Container occupying the full device viewport, where the other layout or elements are positioned.");
    			t26 = space();
    			li1 = element("li");
    			p6 = element("p");
    			code1 = element("code");
    			code1.textContent = "Panel";
    			t28 = text(": A basic Div block, acting as a container for other panels and boxes. Supports flex items inside it. Usually takes the full width of its container. Useful for building navbars, sidebars, drawers, vertical and horizontal sheets, footers, content areas, cards, etc.");
    			t29 = space();
    			li2 = element("li");
    			p7 = element("p");
    			code2 = element("code");
    			code2.textContent = "Box";
    			t31 = text(": A basic inline-block content area, acting as container for smaller elements (such as icons, text, etc). It´s size is usually defined by its content. By default all content outside the box will be \"clipped\" (overflow=hidden). Useful for building buttons, card parts, list items, media containers, etc.");
    			t32 = space();
    			li3 = element("li");
    			p8 = element("p");
    			code3 = element("code");
    			code3.textContent = "Overlay";
    			t34 = text(": An obscured overlay taking full height and width, whose contents are displayed on top of the current page. It can be closed by clicking outside it's content, or controlled by the displayed component (modal).");
    			t35 = space();
    			li4 = element("li");
    			p9 = element("p");
    			code4 = element("code");
    			code4.textContent = "Dialog";
    			t37 = text(": A particular case of an Overlay, where it's content is vertically and horizontally centered.");
    			t38 = space();
    			li5 = element("li");
    			p10 = element("p");
    			code5 = element("code");
    			code5.textContent = "Popover";
    			t40 = text(": A content area displayed on top of other components, whose visibility is triggered by a Target component. Only one Popover can exist at the same time. Triggering a new one automatically closes all others. Useful for building menus, dropdowns, fly-outs, tips, and many other UI components.");
    			t41 = space();
    			li6 = element("li");
    			p11 = element("p");
    			code6 = element("code");
    			code6.textContent = "Target";
    			t43 = text(": A small content area (an anchor) that, when clicked or selected, triggers the visibility of some other component (usually a Popover).");
    			t44 = space();
    			h21 = element("h2");
    			h21.textContent = "Element components";
    			t46 = space();
    			ul1 = element("ul");
    			li7 = element("li");
    			p12 = element("p");
    			p12.textContent = "Button";
    			t48 = space();
    			li8 = element("li");
    			p13 = element("p");
    			p13.textContent = "Check";
    			t50 = space();
    			li9 = element("li");
    			p14 = element("p");
    			p14.textContent = "Icon";
    			t52 = space();
    			li10 = element("li");
    			p15 = element("p");
    			p15.textContent = "Input";
    			t54 = space();
    			li11 = element("li");
    			p16 = element("p");
    			p16.textContent = "Label";
    			t56 = space();
    			li12 = element("li");
    			p17 = element("p");
    			p17.textContent = "Radio";
    			t58 = space();
    			li13 = element("li");
    			p18 = element("p");
    			p18.textContent = "Select";
    			t60 = space();
    			li14 = element("li");
    			p19 = element("p");
    			p19.textContent = "Text";
    			add_location(p0, file$7, 0, 0, 0);
    			add_location(strong, file$7, 1, 12, 120);
    			attr_dev(a0, "href", "https://styled-system.com/");
    			add_location(a0, file$7, 1, 46, 154);
    			attr_dev(a1, "href", "https://system-ui.com/theme");
    			add_location(a1, file$7, 1, 111, 219);
    			add_location(p1, file$7, 1, 0, 108);
    			attr_dev(a2, "href", "./properties.md");
    			add_location(a2, file$7, 2, 65, 351);
    			add_location(p2, file$7, 2, 0, 286);
    			add_location(p3, file$7, 3, 0, 439);
    			html_tag = new HtmlTag(t16);
    			add_location(button, file$7, 5, 0, 475);
    			add_location(h20, file$7, 7, 0, 578);
    			add_location(p4, file$7, 8, 0, 605);
    			add_location(code0, file$7, 10, 7, 774);
    			add_location(p5, file$7, 10, 4, 771);
    			add_location(li0, file$7, 10, 0, 767);
    			add_location(code1, file$7, 12, 7, 907);
    			add_location(p6, file$7, 12, 4, 904);
    			add_location(li1, file$7, 12, 0, 900);
    			add_location(code2, file$7, 14, 7, 1207);
    			add_location(p7, file$7, 14, 4, 1204);
    			add_location(li2, file$7, 14, 0, 1200);
    			add_location(code3, file$7, 16, 7, 1553);
    			add_location(p8, file$7, 16, 4, 1550);
    			add_location(li3, file$7, 16, 0, 1546);
    			add_location(code4, file$7, 18, 7, 1804);
    			add_location(p9, file$7, 18, 4, 1801);
    			add_location(li4, file$7, 18, 0, 1797);
    			add_location(code5, file$7, 20, 7, 1939);
    			add_location(p10, file$7, 20, 4, 1936);
    			add_location(li5, file$7, 20, 0, 1932);
    			add_location(code6, file$7, 22, 7, 2267);
    			add_location(p11, file$7, 22, 4, 2264);
    			add_location(li6, file$7, 22, 0, 2260);
    			add_location(ul0, file$7, 9, 0, 762);
    			add_location(h21, file$7, 25, 0, 2438);
    			add_location(p12, file$7, 27, 4, 2475);
    			add_location(li7, file$7, 27, 0, 2471);
    			add_location(p13, file$7, 29, 4, 2499);
    			add_location(li8, file$7, 29, 0, 2495);
    			add_location(p14, file$7, 31, 4, 2522);
    			add_location(li9, file$7, 31, 0, 2518);
    			add_location(p15, file$7, 33, 4, 2544);
    			add_location(li10, file$7, 33, 0, 2540);
    			add_location(p16, file$7, 35, 4, 2567);
    			add_location(li11, file$7, 35, 0, 2563);
    			add_location(p17, file$7, 37, 4, 2590);
    			add_location(li12, file$7, 37, 0, 2586);
    			add_location(p18, file$7, 39, 4, 2613);
    			add_location(li13, file$7, 39, 0, 2609);
    			add_location(p19, file$7, 41, 4, 2637);
    			add_location(li14, file$7, 41, 0, 2633);
    			add_location(ul1, file$7, 26, 0, 2466);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t2);
    			append_dev(p1, strong);
    			append_dev(p1, t4);
    			append_dev(p1, a0);
    			append_dev(p1, t6);
    			append_dev(p1, a1);
    			append_dev(p1, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t10);
    			append_dev(p2, a2);
    			append_dev(p2, t12);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, p3, anchor);
    			insert_dev(target, t15, anchor);
    			html_tag.m(CODEBLOCK_1, target, anchor);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t18, anchor);
    			mount_component(panelexample, target, anchor);
    			insert_dev(target, t19, anchor);
    			insert_dev(target, h20, anchor);
    			insert_dev(target, t21, anchor);
    			insert_dev(target, p4, anchor);
    			insert_dev(target, t23, anchor);
    			insert_dev(target, ul0, anchor);
    			append_dev(ul0, li0);
    			append_dev(li0, p5);
    			append_dev(p5, code0);
    			append_dev(p5, t25);
    			append_dev(ul0, t26);
    			append_dev(ul0, li1);
    			append_dev(li1, p6);
    			append_dev(p6, code1);
    			append_dev(p6, t28);
    			append_dev(ul0, t29);
    			append_dev(ul0, li2);
    			append_dev(li2, p7);
    			append_dev(p7, code2);
    			append_dev(p7, t31);
    			append_dev(ul0, t32);
    			append_dev(ul0, li3);
    			append_dev(li3, p8);
    			append_dev(p8, code3);
    			append_dev(p8, t34);
    			append_dev(ul0, t35);
    			append_dev(ul0, li4);
    			append_dev(li4, p9);
    			append_dev(p9, code4);
    			append_dev(p9, t37);
    			append_dev(ul0, t38);
    			append_dev(ul0, li5);
    			append_dev(li5, p10);
    			append_dev(p10, code5);
    			append_dev(p10, t40);
    			append_dev(ul0, t41);
    			append_dev(ul0, li6);
    			append_dev(li6, p11);
    			append_dev(p11, code6);
    			append_dev(p11, t43);
    			insert_dev(target, t44, anchor);
    			insert_dev(target, h21, anchor);
    			insert_dev(target, t46, anchor);
    			insert_dev(target, ul1, anchor);
    			append_dev(ul1, li7);
    			append_dev(li7, p12);
    			append_dev(ul1, t48);
    			append_dev(ul1, li8);
    			append_dev(li8, p13);
    			append_dev(ul1, t50);
    			append_dev(ul1, li9);
    			append_dev(li9, p14);
    			append_dev(ul1, t52);
    			append_dev(ul1, li10);
    			append_dev(li10, p15);
    			append_dev(ul1, t54);
    			append_dev(ul1, li11);
    			append_dev(li11, p16);
    			append_dev(ul1, t56);
    			append_dev(ul1, li12);
    			append_dev(li12, p17);
    			append_dev(ul1, t58);
    			append_dev(ul1, li13);
    			append_dev(li13, p18);
    			append_dev(ul1, t60);
    			append_dev(ul1, li14);
    			append_dev(li14, p19);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*toggleExample*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const panelexample_changes = {};

    			if (!updating_show && dirty & /*exampleNum*/ 1) {
    				updating_show = true;
    				panelexample_changes.show = /*exampleNum*/ ctx[0];
    				add_flush_callback(() => updating_show = false);
    			}

    			panelexample.$set(panelexample_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(panelexample.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(panelexample.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(p3);
    			if (detaching) detach_dev(t15);
    			if (detaching) html_tag.d();
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t18);
    			destroy_component(panelexample, detaching);
    			if (detaching) detach_dev(t19);
    			if (detaching) detach_dev(h20);
    			if (detaching) detach_dev(t21);
    			if (detaching) detach_dev(p4);
    			if (detaching) detach_dev(t23);
    			if (detaching) detach_dev(ul0);
    			if (detaching) detach_dev(t44);
    			if (detaching) detach_dev(h21);
    			if (detaching) detach_dev(t46);
    			if (detaching) detach_dev(ul1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const META = {};

    const CODEBLOCK_1 = `<pre><code class="language-js">&lt;Panel
  bg=&quot;surface&quot; 
  color=&quot;secondary++&quot;
  border 
  shadow=&quot;lg&quot;
  rounded=&quot;md&quot;
  p=&quot;nm&quot; pr=&quot;lg&quot; pl=&quot;lg&quot;
  m=&quot;md&quot;&gt;
  A panel with background, color, border, shadow, radii, padding
  and margin using default Theme values
&lt;/Panel&gt;</code></pre>
`;

    function instance$7($$self, $$props, $$invalidate) {
    	let exampleNum = null;

    	function toggleExample() {
    		$$invalidate(0, exampleNum = 1);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Intro> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Intro", $$slots, []);

    	function panelexample_show_binding(value) {
    		exampleNum = value;
    		$$invalidate(0, exampleNum);
    	}

    	$$self.$capture_state = () => ({
    		META,
    		CODEBLOCK_1,
    		Panel,
    		PanelExample: Panels,
    		exampleNum,
    		toggleExample
    	});

    	$$self.$inject_state = $$props => {
    		if ("exampleNum" in $$props) $$invalidate(0, exampleNum = $$props.exampleNum);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [exampleNum, toggleExample, panelexample_show_binding];
    }

    class Intro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.24.1 */
    const file$8 = "src/App.svelte";

    // (3:2) <Panel      font-size="h1"     ml={{'*': "xs", md: '25vw'}}     p="nm"     >
    function create_default_slot_10(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Stylo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(3:2) <Panel      font-size=\\\"h1\\\"     ml={{'*': \\\"xs\\\", md: '25vw'}}     p=\\\"nm\\\"     >",
    		ctx
    	});

    	return block;
    }

    // (25:6) <Panel p="sm">
    function create_default_slot_9(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "Intro";
    			attr_dev(a, "href", "#");
    			add_location(a, file$8, 24, 20, 534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(25:6) <Panel p=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (26:6) <Panel p="sm">
    function create_default_slot_8(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "Layout components";
    			attr_dev(a, "href", "#");
    			add_location(a, file$8, 25, 20, 584);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(26:6) <Panel p=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (27:6) <Panel p="sm">
    function create_default_slot_7(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "Element components";
    			attr_dev(a, "href", "#");
    			add_location(a, file$8, 26, 20, 646);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(27:6) <Panel p=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (28:6) <Panel p="sm">
    function create_default_slot_6(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "CSS properties";
    			attr_dev(a, "href", "#");
    			add_location(a, file$8, 27, 20, 709);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(28:6) <Panel p=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (29:6) <Panel p="sm">
    function create_default_slot_5(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "Theming";
    			attr_dev(a, "href", "#");
    			add_location(a, file$8, 28, 20, 768);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(29:6) <Panel p=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (30:6) <Panel p="sm">
    function create_default_slot_4(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "Api and functions";
    			attr_dev(a, "href", "#");
    			add_location(a, file$8, 29, 20, 820);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(30:6) <Panel p=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (14:4) <Panel       w={{'*': "100%", md: '25vw'}}       mt={{'*': "0", md: 'sm'}}       ml={{'*': "md", md: 0}}       pl={{'*': "nm", md: 0}}       align={{'*': "left", md: "right"}}       border-right={{'*': "0", md: "3"}}       border-left={{'*': "3", md: 0}}       mr="sm" pr="nm" pt="nm" pb="nm"       color="link"       >
    function create_default_slot_3(ctx) {
    	let panel0;
    	let t0;
    	let panel1;
    	let t1;
    	let panel2;
    	let t2;
    	let panel3;
    	let t3;
    	let panel4;
    	let t4;
    	let panel5;
    	let current;

    	panel0 = new Panel({
    			props: {
    				p: "sm",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	panel1 = new Panel({
    			props: {
    				p: "sm",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	panel2 = new Panel({
    			props: {
    				p: "sm",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	panel3 = new Panel({
    			props: {
    				p: "sm",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	panel4 = new Panel({
    			props: {
    				p: "sm",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	panel5 = new Panel({
    			props: {
    				p: "sm",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(panel0.$$.fragment);
    			t0 = space();
    			create_component(panel1.$$.fragment);
    			t1 = space();
    			create_component(panel2.$$.fragment);
    			t2 = space();
    			create_component(panel3.$$.fragment);
    			t3 = space();
    			create_component(panel4.$$.fragment);
    			t4 = space();
    			create_component(panel5.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(panel0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(panel1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(panel2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(panel3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(panel4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(panel5, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const panel0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel0_changes.$$scope = { dirty, ctx };
    			}

    			panel0.$set(panel0_changes);
    			const panel1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel1_changes.$$scope = { dirty, ctx };
    			}

    			panel1.$set(panel1_changes);
    			const panel2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel2_changes.$$scope = { dirty, ctx };
    			}

    			panel2.$set(panel2_changes);
    			const panel3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel3_changes.$$scope = { dirty, ctx };
    			}

    			panel3.$set(panel3_changes);
    			const panel4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel4_changes.$$scope = { dirty, ctx };
    			}

    			panel4.$set(panel4_changes);
    			const panel5_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel5_changes.$$scope = { dirty, ctx };
    			}

    			panel5.$set(panel5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(panel0.$$.fragment, local);
    			transition_in(panel1.$$.fragment, local);
    			transition_in(panel2.$$.fragment, local);
    			transition_in(panel3.$$.fragment, local);
    			transition_in(panel4.$$.fragment, local);
    			transition_in(panel5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(panel0.$$.fragment, local);
    			transition_out(panel1.$$.fragment, local);
    			transition_out(panel2.$$.fragment, local);
    			transition_out(panel3.$$.fragment, local);
    			transition_out(panel4.$$.fragment, local);
    			transition_out(panel5.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(panel0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(panel1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(panel2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(panel3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(panel4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(panel5, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(14:4) <Panel       w={{'*': \\\"100%\\\", md: '25vw'}}       mt={{'*': \\\"0\\\", md: 'sm'}}       ml={{'*': \\\"md\\\", md: 0}}       pl={{'*': \\\"nm\\\", md: 0}}       align={{'*': \\\"left\\\", md: \\\"right\\\"}}       border-right={{'*': \\\"0\\\", md: \\\"3\\\"}}       border-left={{'*': \\\"3\\\", md: 0}}       mr=\\\"sm\\\" pr=\\\"nm\\\" pt=\\\"nm\\\" pb=\\\"nm\\\"       color=\\\"link\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (33:4) <Box        line="ample" font-size="nm" color="body"       markdown        maxw={{'*': "100%", md: "80ch"}}       pl="nm" pr="nm" align="left"       >
    function create_default_slot_2$1(ctx) {
    	let intro;
    	let current;
    	intro = new Intro({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(intro.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(intro, target, anchor);
    			current = true;
    		},
    		i: function intro$1(local) {
    			if (current) return;
    			transition_in(intro.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intro.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(intro, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(33:4) <Box        line=\\\"ample\\\" font-size=\\\"nm\\\" color=\\\"body\\\"       markdown        maxw={{'*': \\\"100%\\\", md: \\\"80ch\\\"}}       pl=\\\"nm\\\" pr=\\\"nm\\\" align=\\\"left\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (9:2) <Panel      flex={{'*': "column", md: "row"}}     justify="start" items="start"     >
    function create_default_slot_1$1(ctx) {
    	let panel;
    	let t;
    	let box;
    	let current;

    	panel = new Panel({
    			props: {
    				w: { "*": "100%", md: "25vw" },
    				mt: { "*": "0", md: "sm" },
    				ml: { "*": "md", md: 0 },
    				pl: { "*": "nm", md: 0 },
    				align: { "*": "left", md: "right" },
    				"border-right": { "*": "0", md: "3" },
    				"border-left": { "*": "3", md: 0 },
    				mr: "sm",
    				pr: "nm",
    				pt: "nm",
    				pb: "nm",
    				color: "link",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	box = new Box({
    			props: {
    				line: "ample",
    				"font-size": "nm",
    				color: "body",
    				markdown: true,
    				maxw: { "*": "100%", md: "80ch" },
    				pl: "nm",
    				pr: "nm",
    				align: "left",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(panel.$$.fragment);
    			t = space();
    			create_component(box.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(panel, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const panel_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel_changes.$$scope = { dirty, ctx };
    			}

    			panel.$set(panel_changes);
    			const box_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(panel.$$.fragment, local);
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(panel.$$.fragment, local);
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(panel, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(9:2) <Panel      flex={{'*': \\\"column\\\", md: \\\"row\\\"}}     justify=\\\"start\\\" items=\\\"start\\\"     >",
    		ctx
    	});

    	return block;
    }

    // (1:0) <Page>
    function create_default_slot$1(ctx) {
    	let panel0;
    	let t;
    	let panel1;
    	let current;

    	panel0 = new Panel({
    			props: {
    				"font-size": "h1",
    				ml: { "*": "xs", md: "25vw" },
    				p: "nm",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	panel1 = new Panel({
    			props: {
    				flex: { "*": "column", md: "row" },
    				justify: "start",
    				items: "start",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(panel0.$$.fragment);
    			t = space();
    			create_component(panel1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(panel0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(panel1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const panel0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel0_changes.$$scope = { dirty, ctx };
    			}

    			panel0.$set(panel0_changes);
    			const panel1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				panel1_changes.$$scope = { dirty, ctx };
    			}

    			panel1.$set(panel1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(panel0.$$.fragment, local);
    			transition_in(panel1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(panel0.$$.fragment, local);
    			transition_out(panel1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(panel0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(panel1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(1:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let page;
    	let current;

    	page = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page_changes.$$scope = { dirty, ctx };
    			}

    			page.$set(page_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	Theme.wireframes(false).build("default").active("default");
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	$$self.$capture_state = () => ({ Theme, Page, Panel, Box, Label, Intro });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		// name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
