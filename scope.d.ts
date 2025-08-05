import Binding = require('./binding');
import * as acorn from 'acorn';

export = Scope;

/**
 * A scope represents a lexical scope in JavaScript code, containing variable bindings.
 */
declare class Scope {
  /**
   * The parent scope, if any
   */
  parent: Scope | null;

  /**
   * Map of binding names to their Binding objects
   */
  bindings: Map<string, Binding>;

  /**
   * Map of undeclared variable names to their Binding objects
   */
  undeclaredBindings: Map<string, Binding>;

  /**
   * Creates a new scope
   * @param parent - The parent scope, if any
   */
  constructor(parent?: Scope | null);

  /**
   * Define a binding in this scope
   * @param binding - The binding to define
   * @returns This scope instance for chaining
   */
  define(binding: Binding): this;

  /**
   * Check if this scope has a binding with the given name
   * @param name - The name to check for
   * @returns True if the binding exists, false otherwise
   */
  has(name: string): boolean;

  /**
   * Add a reference to an existing binding in this scope
   * @param name - The name of the binding
   * @param ref - The AST node that references the binding
   * @returns This scope instance for chaining
   */
  add(name: string, ref: acorn.Node): this;

  /**
   * Add an undeclared variable reference to this scope
   * @param name - The name of the undeclared variable
   * @param ref - The AST node that references the variable
   * @returns This scope instance for chaining
   */
  addUndeclared(name: string, ref: acorn.Node): this;

  /**
   * Get a binding by name from this scope
   * @param name - The name of the binding to retrieve
   * @returns The binding if found, undefined otherwise
   */
  getBinding(name: string): Binding | undefined;

  /**
   * Get all references to a binding in this scope
   * @param name - The name of the binding
   * @returns Array of AST nodes that reference the binding, or empty array if not found
   */
  getReferences(name: string): acorn.Node[];

  /**
   * Get the names of all undeclared variables in this scope
   * @returns Array of undeclared variable names
   */
  getUndeclaredNames(): string[];

  /**
   * Iterate over all bindings in this scope
   * @param callbackfn - Function called for each binding
   * @param thisArg - Value to use as 'this' when executing the callback
   */
  forEach(callbackfn: (binding: Binding, name: string, map: Map<string, Binding>) => void, thisArg?: any): void;

  /**
   * Iterate over all available bindings (including those from parent scopes)
   * @param cb - Callback function called for each available binding
   */
  forEachAvailable(cb: (binding: Binding, name: string) => void): void;
}
