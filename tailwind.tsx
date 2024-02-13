import tailwind, { TailwindFn, create } from 'twrnc';

let tw :TailwindFn = tailwind

tw = create(require(`./tailwind.config`))

export default tw