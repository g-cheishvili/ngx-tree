import { AbstractTreeToken } from '../../core/tokens/AbstractTreeToken';

export abstract class TreeToken<T = any> extends AbstractTreeToken<T> {
  abstract selection: 'multiple' | 'single' | 'off';
}
