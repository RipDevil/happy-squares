import { GitSewer } from './service.js';
import { execTerminal as exec } from '../../utils/exec-terminal.js';

export default (() => new GitSewer(exec))();
