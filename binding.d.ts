import * as acorn from 'acorn';

export = Binding;

/**
 * A binding represents a variable declaration and its references in a scope.
 */
declare class Binding {
  /**
   * The name of the binding
   */
  name: string;

  /**
   * The AST node where this binding is defined (optional)
   */
  definition?: acorn.Node;

  /**
   * Set of AST nodes that reference this binding
   */
  references: Set<acorn.Node>;

  /**
   * Creates a new binding
   * @param name - The name of the binding
   * @param definition - The AST node where this binding is defined
   */
  constructor(name: string, definition?: acorn.Node);

  /**
   * Add a reference to this binding
   * @param node - The AST node that references this binding
   * @returns This binding instance for chaining
   */
  add(node: acorn.Node): this;

  /**
   * Remove a reference from this binding
   * @param node - The AST node to remove
   * @returns This binding instance for chaining
   * @throws Error if the reference doesn't exist
   */
  remove(node: acorn.Node): this;

  /**
   * Check if this binding is referenced by any nodes other than its definition
   * @returns True if the binding is referenced, false otherwise
   */
  isReferenced(): boolean;

  /**
   * Get all references to this binding as an array
   * @returns Array of AST nodes that reference this binding
   */
  getReferences(): acorn.Node[];

  /**
   * Iterate over all references to this binding
   * @param cb - Callback function called for each reference
   * @returns This binding instance for chaining
   */
  each(cb: (ref: acorn.Node) => void): this;
}
